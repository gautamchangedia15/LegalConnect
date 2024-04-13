import admin from "../firebase.js";

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
    const { name, email, expertise_area, city, education, about, propExp } =
      req.body;
    const docRef = await providerCollection.add({
      name,
      email,
      expertise_area,
      city,
      education,
      about,
      propExp,
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

export { getAll, addProfile, getProfile };
