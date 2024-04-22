import express from "express"
import { sendMessage,getMessages } from "../controllers/messageController.js";
import { verifyAccessToken } from "../config/jwtConfig.js"; 
const router=express.Router();

//get messages
router.route("/:id").get(verifyAccessToken,getMessages)
//pass receiver id
router.route("/send/:id").post(verifyAccessToken,sendMessage)
export default router;