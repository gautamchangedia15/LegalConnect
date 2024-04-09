import admin from "../firebase.js";

const db = admin.firestore();


//to do: create getAll APi for client and also for diff queries

// add a new legal service provider
// expertise area should store an arrays
// isVerified->bool, phone_number, address,availability, profile_image_url and other data of LSP be added
const addProfile = async (req, res) => {
  try {
    const { name, email, expertise_area } = req.body;
    const docRef = await db.collection("providers").add({
      name,
      email,
      expertise_area,
    });
    res.status(201).json({
      message: "Provider data submitted for verification",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error submitting provider:", error);
    res.status(500).json({ error: "Error submitting provider data" });
  }
};

//get LSP based upon it id
const getProfile = async (req, res) => {
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
};

export {addProfile,getProfile}