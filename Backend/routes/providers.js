import express from "express";
import { addProfile,getProfile } from "../controllers/providerController";

const router = express.Router();


//add LSP
router.route("/addProfile").post(addProfile);

//get the details of LSP by passing the DocID of that LSP
router.route("/getProfile/:id").post(getProfile);

export default router;
