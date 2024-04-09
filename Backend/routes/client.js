import express from "express";
import { addClient } from "../controllers/clientController.js";

const router = express.Router();

// Route to add a new client
router.route("/addClient").post(addClient);

//route to get the client info
export default router;
