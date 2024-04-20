import admin from "firebase-admin";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

console.log("Connection Initialised.....");
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Connected firebase Successfully!");
} catch (error) {
  console.log("Error connecting to firebase: ", error.message || error);
}

export default admin;
