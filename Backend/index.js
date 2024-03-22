import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import admin from "./firebase.js"
import clients from "./routes/clients.js"
import providers from "./routes/providers.js"

const PORT = 3000;
const app = express();
const db = admin.firestore();

app.use(cors()); //check if origin and credentials are to be given as parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
//route 1: clients
app.use("/clients",clients);
//route 2:LSP
app.use("/providers",providers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
