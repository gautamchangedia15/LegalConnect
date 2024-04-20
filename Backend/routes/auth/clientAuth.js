import express from "express";
import {
  addClient,
  clientLogin,
  clientLogout,
  currentClient,
} from "../../controllers/clientController.js";

const router = express.Router();

//register new login
router.route("/register").post(addClient);

//logging provider
router.route("/login").post(clientLogin);

//provider logout
router.route("/logout").get(clientLogout);

//provider logout
router.route("/currentClient").get(currentClient);

export default router;
