import express from "express";
import {
  providerLogin,
  providerLogout,
} from "../../controllers/providerController.js";

const router = express.Router();

//logging provider
router.route("/provider/login").post(providerLogin);

//provider logout
router.route("/provider/logout").post(providerLogout);

export default router;