import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import clients from "./routes/client.js";
import providers from "./routes/provider.js";

const PORT = 3000;
const app = express();

app.use(cors()); //to check if origin and credentials are to be given as parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//route for clients
app.use("/client", clients);
//route for LSP
app.use("/provider", providers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
