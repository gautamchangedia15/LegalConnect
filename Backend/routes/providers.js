import express from "express";
import admin from "../firebase.js";

const db = admin.firestore();
const router = express.Router();

// Route to add a new legal service provider
// expertise area should store an arrays
// isVerified->bool, phone_number, address,availability, profile_image_url should be added
//data will be stored in Unverified database so the admin can verify
router.post("/addProfile", async (req, res) => {
  try {
    const { name, email, expertise_area } = req.body;
    const docRef = await db.collection("unverifiedProviders").add({
      name,
      email,
      expertise_area,
    });
    res
      .status(201)
      .json({ message: "Provider data submitted for verification", id: docRef.id });
  } catch (error) {
    console.error("Error submitting provider:", error);
    res.status(500).json({ error: "Error submitting provider data" });
  }
});

//get the details of LSP by passing the DocID of that LSP
router.get("/getProfile/:id", async (req, res) => {
  try {
    const providerId = req.params.id;
    const providerDoc = await db.collection("providers").doc(providerId).get();

    if (!providerDoc.exists) {
      res.status(404).send("User not found");
    }

    const providerData = providerDoc.data();
    res.json(providerData);
  } catch (error) {
    console.error("Error in getting Provider from firebase", error);
    res.status(500).send("Error retrieving provider data");
  }
});

//When the LSP makes the request to update the profile, it will be stored in profileUpdate database
//and once admin accepts the update it will be overwritten in provider (LSP) database
//In req.body should have the full data, not only the update one
router.put("/editProfile/:id",async (req, res) => {
  try{
    const providerId=req.params.id
    const { name, email, expertise_area } = req.body;
    const docRef=db.collection('unverifiedProviders').add({providerId,name,email,expertise_area})
    res
      .status(201)
      .json({ message: "Provider data submitted for update", id: docRef.id });
  }catch (error) {
    console.error("Error submitting update:", error);
    res.status(500).json({ error: "Error submitting update" });
  }
});
export default router;
