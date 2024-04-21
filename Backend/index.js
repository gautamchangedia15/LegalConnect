import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import providerAuth from "./routes/auth/providerAuth.js";
import clientAuth from "./routes/auth/clientAuth.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import clients from "./routes/client.js";
import providers from "./routes/provider.js";
import booking from "./routes/booking.js";
import cookieParser from "cookie-parser";

const PORT = 3000;
import { app, server } from "./socket/socket.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route for auth of provider
app.use("/auth/provider", providerAuth);
//route for auth of client
app.use("/auth/client", clientAuth);
//route for clients
app.use("/client", clients);
//route for LSP
app.use("/provider", providers);

//route for booking
app.use("/booking", booking);

//for chat application
app.use("/messages",messagesRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
