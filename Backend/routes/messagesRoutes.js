import express from "express";
import cookieParser from "cookie-parser";
const app=express();

import {
  sendMessage,
  getMessages,
  getUserInteractionsList,
} from "../controllers/messageController.js";
import { verifyAccessToken } from "../config/jwtConfig.js";
const router = express.Router();

app.use(cookieParser());

//pass receiver id
router.route("/send/:id").post(verifyAccessToken, sendMessage);

//get messages
router.route("/getMessages/:id").get(verifyAccessToken, getMessages);
router
  .route("/getUserInteractionsList")
  .get(verifyAccessToken, getUserInteractionsList);
export default router;
