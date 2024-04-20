import admin from "../firebase.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
// const admin = require('firebase-admin');

import jwt from "jsonwebtoken";
import { generateAccessToken, verifyAccessToken } from "../config/jwtConfig.js";
// import authenticateToken from '../middleware/authMiddleware.js';

const app = express();

// Get a reference to the Firestore service
const db = admin.firestore();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

const addClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const querySnapshot = await db
      .collection("clients")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) {
      return res.status(400).send("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const docRef = await db.collection("clients").add({
      name,
      email,
      password: hashedPassword,
      role: "Client",
    });

    const docSnapshot = await docRef.get();

    const token = jwt.sign(
      { userId: docRef.id, email: docSnapshot.data().email },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "10d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(201)
      .json({ message: "Client added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ error: "Failed to add client" });
  }
};

const clientLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const clientRef = await db
      .collection("clients")
      .where("email", "==", email)
      .get();
    if (clientRef.empty) {
      res.status(404).json({ error: "Client not found" });
    } else {
      const client = clientRef.docs[0].data();
      console.log("Client: ",client);
      const isMatch = await bcrypt.compare(password, client.password);
      if (isMatch) {
        const token = verifyAccessToken({ userId: clientRef.docs[0].id, email: client.email });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        let newww = clientRef.docs[0].id;
        res
          .status(200)
          .json({ message: "Client logged in successfully", newww });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(500).json({ error: "Failed to log in client" });
  }
};

const clientLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Client logged out successfully" });
  } catch (error) {
    console.error("Error logging out client:", error);
    res.status(500).json({ error: "Failed to log out client" });
  }
};

const currentClient = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message || "JWT verification failed",
        });
      }
      console.log("Decode data: ",decoded);
      try {
        // Retrieve the document from Firestore by ID
        const docRef = db.collection("clients").doc(decoded.userId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          return res
            .status(404)
            .json({ success: false, error: "Client document not found" });
        }

        const clientData = docSnapshot.data();
        delete clientData.password;
        return res.status(200).json({ success: true, data: clientData });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message || "Failed to fetch client document",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export { addClient, clientLogin, clientLogout, currentClient };

// try {
//   // Retrieve the document from Firestore by ID
//   const docRef = db.collection('clients').doc(decoded.userId);
//   const docSnapshot = await docRef.get();

//   if (!docSnapshot.exists) {
//       return res.status(404).json({ error: 'Document not found' });
//   }

//   const clientData = docSnapshot.data();
//   return res.json(clientData);
// } catch (error) {
//   console.error('Error fetching document:', error);
//   return res.status(500).json({ error: 'Failed to fetch document' });
// }

// export {addClient, clientLogin}
