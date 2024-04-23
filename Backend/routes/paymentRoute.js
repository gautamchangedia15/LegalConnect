import express from "express";
import {
  capturePayment,
  createLinkedAcc,
  createOrder,
  transferPayments,
} from "../controllers/paymentController.js";

const router = express.Router();

//create linked account
router.route("/linkedacc/:id").post(createLinkedAcc);
router.route("/createorder").post(createOrder);
router.route("/capturePayment").post(capturePayment);
router.route("/transferPayments").post(transferPayments);

export default router;
