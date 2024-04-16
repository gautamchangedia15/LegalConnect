import admin from "../firebase.js";

const db = admin.firestore();
const providerCollection = db.collection("providers");

// bookingController.js
const express = require("express");
const jwtConfig = require("./jwtConfig"); // Import your JWT configuration

const router = express.Router();

const getAvailability = async (req, res) => {};

export { getAvailability };
