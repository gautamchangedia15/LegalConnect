import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: "./config/config.env" });
import providerAuth from "./routes/auth/providerAuth.js"
import clients from "./routes/client.js";
import providers from "./routes/provider.js";
import { addClient, clientLogin, clientLogout, currentClient } from "./controllers/clientController.js";
import cookieParser from "cookie-parser";
// import { verifyToken } from './middleware/authMiddleware.js';
const PORT = 3000;
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Client
app.post('/api/client/register', addClient);

// Login client
app.post('/api/client/login', clientLogin )

// Logout Client
app.post('/api/client/logout', clientLogout)

// current user
app.get('/api/client/current', currentClient)
// app.get('/api/client/profile', verifyToken, (req, res) => {
  // Access authenticated user's data from req.user
  // const { userId, email } = req.user;
  // res.json({ userId, email });
// });

//route for auth of provider
app.use("/auth",providerAuth)
//route for clients
app.use("/client", clients);
//route for LSP
app.use("/provider", providers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
