import admin from "../firebase.js";
import express from "express";
import crypto from "crypto";
import { log } from "console";

const router = express.Router();
const db = admin.firestore();
const providerCollection = db.collection("providers");

//for provider to add new slots
const addSlot = async (req, res) => {
  const providerId = req.user.userId || req.user.user.userId; //userID give by JWTConfig.js

  const newSlot = {
    ...req.body,
    isBooked: false,
    bookedBy: "",
    slotId: crypto.randomUUID(),
  };
  const givenDate = new Date(newSlot.date);
  const today = new Date();
  if (givenDate < today) {
    res
      .status(400)
      .json({ success: false, error: "Given Date is already a past!" });
    return;
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
    return;
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
        res
          .status(404)
          .json({ success: false, message: "Provider not found!" });
        return;
      }
      const availability = providerDoc.data().availability || [];

      // Check if the slot ID exists within the array
      const slotIndex = availability.findIndex(
        (slot) => slot.slotId === slotId
      );
      if (slotIndex === -1) {
        res.status(404).json({ success: false, message: "Slot not found!" });
        return;
      }

      // Check if the slot is booked before deletion
      if (availability[slotIndex].isBooked == true) {
        res
          .status(404)
          .json({ success: false, message: "Cannot delete a booked Slot!" });
        return;
      }

      // Remove the slot using array removal
      const updatedAvailability = [
        ...availability.slice(0, slotIndex),
        ...availability.slice(slotIndex + 1),
      ];
      transaction.update(providerRef, { availability: updatedAvailability });
    });

    res.json({ success: true, message: "Slot deleted successfully" });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ success: false, message: "Error deleting slot" });
  }
};

const updateSlot = async (req, res) => {
  try {
    // Extract providerId and slotId from request parameters
    const { providerId, slotId, bookedById } = req.body;

    // Find the provider document
    const providerRef = db.collection("providers").doc(providerId);
    const providerDoc = await providerRef.get();

    // Check if provider exists
    if (!providerDoc.exists) {
      return res.status(404).json({ error: "Provider not found" });
    }

    // Get the availability array from provider document
    const availability = providerDoc.data().availability || [];

    // Find the slot with the matching slotId
    const updatedAvailability = availability.map((slot) => {
      if (slot.slotId === slotId) {
        // Update isBooked and bookedBy fields
        return { ...slot, isBooked: true, bookedBy: bookedById };
      }
      return slot;
    });

    // Update the provider document with the modified availability array
    await providerRef.update({ availability: updatedAvailability });

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Availability updated successfully" });
  } catch (error) {
    console.error("Error updating availability:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error updating availability" });
  }
};
export { addSlot, deleteSlot, updateSlot };
