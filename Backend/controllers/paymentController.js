import admin from "../firebase.js";
import axios from "axios";
// Razorpay API credentials
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
import Razorpay from "Razorpay";
// firebase
const db = admin.firestore();

// creating linked accounts
export const createLinkedAcc = async (req, res) => {
  const { accountData } = req.body;
  const { id } = req.params;
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

    res.status(200).json({
      success: true,
      data: response.data,
    });
    const collectionRef = db.collection("providers").doc(id);
    await collectionRef.update({
      razorpayAccount: response.data,
      accountStatus: "account linked",
    });
    return;
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};

// linked account activation

// export const linkedAccActivation = async (req, res) => {
//   const { activationData, accountId } = req.body;
//   try {
//     const response = await axios.post(
//       `https://api.razorpay.com/v1/accounts/acc_O1CgkcQvLjvaJp/activate`,
//       {
//         account_number: "50100472212753",
//         account_type: "savings",
//         ifsc: "HDFC0000181",
//         branch_name: "hdfc provate limited",
//         name: "Gautam Changedia",
//       },

//       {
//         auth: {
//           username: apiKey,
//           password: apiSecret,
//         },
//       }
//     );

//     console.log("Linked Account activated:", response.data);
//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error activating Linked Account:", error.response.data);
//     res.json({
//       success: false,
//     });
//   }
// };

export const createOrder = async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    const data = await axios.post(
      "https://api.razorpay.com/v1/orders",
      { amount, currency, receipt, notes },
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};

export const capturePayment = async (req, res) => {
  const { paymentId, amount } = req.body;
  try {
    const url = `https://api.razorpay.com/v1/payments/${paymentId}/capture`;

    const data = await axios.post(
      url,
      {
        amount: amount,
        currency: "INR",
      },
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment Captured Successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: `Error Capturing Payment: ${error}`,
    });
  }
};

export const transferPayments = async (req, res) => {
  const { paymentId, transfers, providerID } = req.body;
  var instance = new Razorpay({ key_id: apiKey, key_secret: apiSecret });

  instance.payments
    .transfer(paymentId, { transfers })
    .then(async (response) => {
      console.log("Transfer successful:", response);
      const collectionRef = db.collection("providers").doc(providerID);
      await collectionRef.update({
        transfer: response.items,
      });
      return res.status(200).json({
        success: true,
        message: response.data || "Transfer Successful",
      });
    })
    .catch((error) => {
      console.error("Transfer failed:", error);
      return res.status(200).json({
        success: false,
        error: error.message || "Transfer fail",
      });
    });
};
