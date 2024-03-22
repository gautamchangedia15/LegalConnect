import express from "express";

const router = express.Router();

// Route to add a new legal service provider
// expertise area should store an arrays
// isVerified->bool, phone_number, address,availability, profile_image_url should be added
app.post("/addProvider", async (req, res) => {
  try {
    const { name, email, expertise_area } = req.body;
    const docRef = await db.collection("providers").add({
      name,
      email,
      expertise_area,
    });
    res
      .status(201)
      .json({ message: "Provider added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding provider:", error);
    res.status(500).json({ error: "Failed to add provider" });
  }
});

export default router;
