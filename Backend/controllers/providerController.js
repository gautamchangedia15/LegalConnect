import admin from "../firebase.js";
import bcrypt from "bcrypt";
import { generateAccessToken, verifyAccessToken } from "../config/jwtConfig.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
// Razorpay API credentials
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const db = admin.firestore();
const providerCollection = db.collection("providers");
const getAll = async (req, res) => {
  //Building query based on available paramters passed by req
  let query = providerCollection;

  const name = req.query.name;
  const exp = req.query.expertise_area;
  const city = req.query.city;
  if (name) {
    let Lname = name.toLowerCase();
    query = query
      .where("name", ">=", Lname)
      .where("name", "<=", Lname + "\uf8ff");
  }
  if (exp) {
    query = query.where("expertise_area", "array-contains", exp);
  }

  if (city) {
    query = query.where("city", "==", city);
  }

  //Retriving the data based upon query from database
  try {
    const querySnapshot = await query.get();
    const providers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      success: true,
      providers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving provider data");
  }
};
// add a new legal service provider
// expertise area should store an arrays
// isVerified->bool, phone_number, address,availability, profile_image_url and other data of LSP be added
const addProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      role = "Provider",
      password,
      domain,
      expertise_area,
      city,
      education,
      about,
      propExp,
      enrollementId,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const docRef = await providerCollection.add({
      name,
      email,
      password: hashedPassword,
      domain,
      role: "Provider",
      expertise_area,
      city,
      education,
      about,
      propExp,
      enrollementId,
      verified: false,
      availability: [], //to further store time slots
      razorpayAccount: {},
      accountStatus: "initial",
      clients: [],
      payments: [],
    });
    // create linked account
    const response = await axios.post(
      "https://api.razorpay.com/v2/accounts",
      {
        email: email,
        phone: "9000090000",
        type: "route",
        reference_id: docRef.id,
        legal_business_name: "Acme Corp",
        business_type: "partnership",
        contact_name: "Gaurav Kumar",
        profile: {
          category: "healthcare",
          subcategory: "clinic",
          addresses: {
            registered: {
              street1: "507, Koramangala 1st block",
              street2: "MG Road",
              city: "Bengaluru",
              state: "KARNATAKA",
              postal_code: "560034",
              country: "IN",
            },
          },
        },
        legal_info: {
          pan: "AABFL1734C",
          gst: "18AABCU9603R1ZM",
        },
      },

      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      }
    );

    const token = jwt.sign(
      { userId: docRef.id },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "10d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(201)
      .json({
        message: "Provider data submitted for verification",
        id: docRef.id,
        data: response.data,
      });
  } catch (error) {
    console.error("Error submitting provider:", error);
    res.status(500).json("Error submitting provider");
  }
};

//get LSP based upon it id
const getProfile = async (req, res) => {
  try {
    const providerId = req.params.id;
    const providerDoc = await providerCollection.doc(providerId).get();
    if (!providerDoc.exists) {
      res.status(404).send("User not found");
    }
    const providerData = providerDoc.data();
    res.json(providerData);
  } catch (error) {
    console.error("Error in getting Provider from firebase", error);
    res.status(500).send("Error retrieving provider data");
  }
};

const providerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const providerRef = await db
      .collection("providers")
      .where("email", "==", email)
      .get();
    if (providerRef.empty) {
      res.status(404).json({ error: "Provider not found" });
    } else {
      const provider = providerRef.docs[0].data();
      const isMatch = await bcrypt.compare(password, provider.password);
      if (isMatch) {
        const token = generateAccessToken({
          userId: providerRef.docs[0].id,
          email: provider.email,
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        let neww = providerRef.docs[0].id;
        res
          .status(200)
          .json({ message: "Provider logged in successfully", neww });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to log in provider" });
  }
};

const providerLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Provider logged out successfully" });
  } catch (error) {
    console.error("Error logging out provider:", error);
    res.status(500).json({ error: "Failed to log out provider" });
  }
};

const currentProvider = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "JWT verification failed" });
      }

      try {
        // Retrieve the document from Firestore by ID
        const docRef = db.collection("providers").doc(decoded.user.userId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          return res
            .status(404)
            .json({ success: false, error: "Client document not found" });
        }
        const providerData = docSnapshot.data();
        delete providerData.password;
        return res.status(200).json({
          success: true,
          data: { id: decoded.user.userId, ...providerData },
        });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, error: "Failed to fetch client document" });
      }
    });
  } catch (error) {
    // console.error("Error processing request:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const addClientData = async (req, res) => {
  try {
    const { providerId, clientsData } = req.body;

    const providerDoc = await db.collection("providers").doc(providerId).get();
    if (!providerDoc.exists) {
      return res.status(404).json({ error: "Provider not found" });
    }
    const providerRef = db.collection("providers").doc(providerId);

    // Used FieldValue.arrayUnion for pushing into array
    await providerRef.update({
      clients: admin.firestore.FieldValue.arrayUnion(clientsData),
    });
    return res
      .status(200)
      .json({ success: true, message: "Client added successfully" });
  } catch (error) {
    console.error("Error adding client:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const addPaymentData = async (req, res) => {
  try {
    const { providerId, PaymentData } = req.body;

    const providerDoc = await db.collection("providers").doc(providerId).get();
    if (!providerDoc.exists) {
      return res.status(404).json({ error: "Provider not found" });
    }
    const providerRef = db.collection("providers").doc(providerId);

    // Used FieldValue.arrayUnion for pushing into array
    await providerRef.update({
      payments: admin.firestore.FieldValue.arrayUnion(PaymentData),
    });
    return res
      .status(200)
      .json({ success: true, message: "Payment added successfully" });
  } catch (error) {
    console.error("Error adding payment:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAll,
  addProfile,
  getProfile,
  providerLogin,
  providerLogout,
  currentProvider,
  addClientData,
  addPaymentData,
};
