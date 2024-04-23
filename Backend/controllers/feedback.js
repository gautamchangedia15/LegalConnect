import admin from "../firebase.js";
import express from "express";
const app = express();
const db = admin.firestore();

const addFeedback = async (req, res) => {
  try { 
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
      res.status(400).send("Please provide all required fields");
    } else {
        const docRef = await db.collection('feedback').add({
            name, email, message
        })
        res.send(201)
        res.status("feedback added successfuly")

    }}
    catch (error) {
        console.error("Error adding client:", error);
        res.status(500).json({ error: "Failed to add feedback" });
    }

}
export { addFeedback };


