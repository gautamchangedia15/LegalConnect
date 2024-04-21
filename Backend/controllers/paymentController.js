import admin from "../firebase.js";
const axios = require("axios");
// Razorpay API credentials
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

// firebase
const db = admin.firestore();

export const createLinkedAcc = async (req, res) => {
  // Create an account payload
  // const accountData = {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     contact: '+1234567890',
  //     type: 'business',
  //     description: 'Example Business Account',
  //   };
  const { accountData, id } = req.body;

  // Function to make the POST request
  try {
    const response = await axios.post(
      "https://api.razorpay.com/v2/accounts",
      accountData,
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      }
    );

    console.log("Account created successfully:", response.data);
  } catch (error) {
    console.error("Error creating account:", error.response.data);
  }

  const ref = db.ref(`providers${id}`);
  ref
    .set({ razorpayAccount: response })
    .then(() => {
      res.status(200).send("Data added successfully", response);
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res.status(500).send("Error adding data");
    });
};
