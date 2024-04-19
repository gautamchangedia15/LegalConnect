
import express from "express";
import {addSlot} from "../controllers/bookingController.js"
import {verifyAccessToken} from "../config/jwtConfig.js"

// const app=express()
// const router = express.Router();


// //Check if the user is logged in or not
// app.use(jwtConfig.js)

// router.route("/getAvailability").get(getAvailability);
// module.exports=router;

//Check if the user is logged in or not
app.use(verifyAccessToken)

router.route("/addSlot/:id").post(addSlot);
export default router;
