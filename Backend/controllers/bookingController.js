import admin from "../firebase.js";
import express from "express";

const router = express.Router();
const db = admin.firestore();
const providerCollection = db.collection("providers");

const addSlot = async (req, res) => {
  const providerId = req.params.id;
  const newSlot = req.body;
  const givenDate=new Date(newSlot.date);
  const today = new Date();
  if (givenDate < today) {
    res
      .status(400)
      .json({ success: false, error: "Given Date is already a past!" });
  }

  try {
    const providerRef = db.collection("providers").doc(providerId);

    // Used FieldValue.arrayUnion for pushing into array
    await providerRef.update({
      availability: admin.firestore.FieldValue.arrayUnion(newSlot),
    });
    res.status(200).json({success:true,messsage:"Time Slot added Successfully!"})
  } catch (err) {
    console.error("Error updating availability:", err);
    res.status(500).json({success:false,error:"Error adding time slot"})
  }
};

export { addSlot };
