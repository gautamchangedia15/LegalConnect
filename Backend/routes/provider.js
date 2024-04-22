import express from "express";
import {
  getAll,
  addProfile,
  getProfile,
  providerLogin,
  providerLogout,
  addClientData,
  addPaymentData,
} from "../controllers/providerController.js";

const router = express.Router();

//get LSP based upon search filters
router.route("/getall").get(getAll);
//add LSP
router.route("/addprofile").post(addProfile);

//get the details of LSP by passing the DocID of that LSP
router.route("/getProfile/:id").get(getProfile);

router.route("/addClientData").post(addClientData);
router.route("/addPaymentData").post(addPaymentData);

//Provider login
router.route("/login").get();
export default router;
