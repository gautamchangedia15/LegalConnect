import admin from "../firebase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      password,
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
      expertise_area,
      city,
      education,
      about,
      propExp,
      enrollementId,
    });
    res.status(201).json({
      message: "Provider data submitted for verification",
      id: docRef.id,
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
        const token=jwtConfig.generateAccessToken({ userId: providerRef.docs[0].id, email: provider.email });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        let neww = providerRef.docs[0].id;
        res
          .status(200)
          .json({ message: "Provider logged in successfully", neww });
        console.log(token);
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    console.error("Error logging in provider:", error);
    res.status(500).json({ error: "Failed to log in provider" });
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

export { getAll, addProfile, getProfile, providerLogin, providerLogout };
