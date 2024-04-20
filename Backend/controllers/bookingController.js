import admin from "../firebase.js";
import express from "express";
import crypto from "crypto";
import { log } from "console";

const router = express.Router();
const db = admin.firestore();
const providerCollection = db.collection("providers");

//for provider to add new slots
const addSlot = async (req, res) => {
  const providerId = req.user.user.userId; //userID give by JWTConfig.js
  const newSlot = { ...req.body, isBooked: false, slotId: crypto.randomUUID() };
  const givenDate = new Date(newSlot.date);
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
    res
      .status(200)
      .json({ success: true, messsage: "Time Slot added Successfully!" });
  } catch (err) {
    console.error("Error updating availability:", err);
    res.status(500).json({ success: false, error: "Error adding time slot" });
  }
};

//for a provider to delete a slot
const deleteSlot = async (req, res) => {
  try {
    const providerId = req.user.user.userId; //userID give by JWTConfig.js
    const slotId = req.params.slotId;
    const providerRef = db.collection("providers").doc(providerId);
    // Use a transaction to ensure atomic deletion
    await db.runTransaction(async (transaction) => {
      const providerDoc = await transaction.get(providerRef);

      if (!providerDoc.exists) {
        res.status(404).json({success:false,message:"Provider not found!"})
      }
      const availability = providerDoc.data().availability || [];

      // Check if the slot ID exists within the array
      const slotIndex = availability.findIndex(
        (slot) => slot.slotId === slotId
      );
      if (slotIndex === -1) {
        res.status(404).json({success:false,message:"Slot not found!"})
      }

      // Check if the slot is booked before deletion
      if (availability[slotIndex].isBooked == true) {
        res.status(404).json({success:false,message:"Cannot delete a booked Slot!"})
      }

      // Remove the slot using array removal
      const updatedAvailability = [
        ...availability.slice(0, slotIndex),
        ...availability.slice(slotIndex + 1),
      ];
      transaction.update(providerRef, { availability: updatedAvailability });
    });

    res.json({ success:true,message: "Slot deleted successfully" });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ success:false,message: "Error deleting slot" });
  }
};
export { addSlot, deleteSlot };
