// import express from "express"
// const router=express.Router()

// // Register Client
// router.post('/api/client/register', addClient);

// // Login client
// app.post('/api/client/login', clientLogin )

// // Logout Client
// app.post('/api/client/logout', clientLogout)

// // current user
// app.get('/api/client/current', currentClient)

import express from "express";
import {
  addClient,
  clientLogin,
  clientLogout,
} from "../../controllers/clientController.js";

const router = express.Router();

router.route('/register').post(addClient)

//logging provider
router.route("/login").post(clientLogin);

//provider logout
router.route("/logout").post(clientLogout);

export default router;