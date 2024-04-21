import express from "express";
import {
  addClient,
  clientLogin,
  currentClient,
  clientLogout,
} from "../controllers/clientController.js";

const router = express.Router();

// Route to add a new client
router.route("/addClient").post(addClient);
router.route("/clientLogin").post(addClient);
router.route("/currentLogin").get(currentClient);
router.route("/clientLogout").post(clientLogout);

//route to get the client info
export default router;
