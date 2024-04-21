import express from "express";
import {
  createLinkedAcc,
  createOrder,
} from "../controllers/paymentController.js";

const router = express.Router();

//create linked account
router.route("/linkedacc/:id").post(createLinkedAcc);
router.route("/createorder").post(createOrder);

export default router;
