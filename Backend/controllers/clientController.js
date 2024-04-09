import admin from "../firebase.js";
const db = admin.firestore();

const addClient=async (req, res) => {
    try {
      const { name, email, phone_number } = req.body;
      const docRef = await db.collection("clients").add({
        name,
        email,
        phone_number,
      });
      res
        .status(201)
        .json({ message: "Client added successfully", id: docRef.id });
    } catch (error) {
      console.error("Error adding client:", error);
      res.status(500).json({ error: "Failed to add client" });
    }
}

export {addClient}