
import express from "express";
import { addSlot,deleteSlot } from "../controllers/bookingController.js"
import { verifyAccessToken } from "../config/jwtConfig.js";


const app = express();
const router = express.Router();

//route to add Slot
router.route("/addSlot").post(verifyAccessToken, addSlot);

//route to delete a slot based upon the slot id
router.route("/deleteSlot/:slotId").delete(verifyAccessToken, deleteSlot);
export default router;
