import express from "express";
import {
  addClient,
  clientLogin,
  clientLogout,
} from "../../controllers/clientController.js";

const router = express.Router();

router.route("/register").post(addClient);

//logging provider
router.route("/login").post(clientLogin);

//provider logout
router.route("/logout").post(clientLogout);

//provider logout
router.route("/currentClient").get(clientLogout);

export default router;
