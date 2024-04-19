import express from "express";
import {
  addProfile,
  providerLogin,
  providerLogout,
} from "../../controllers/providerController.js";

const router = express.Router();

router.route('/register').post(addProfile)

//logging provider
router.route("/login").post(providerLogin);

//provider logout
router.route("/logout").post(providerLogout);

export default router;