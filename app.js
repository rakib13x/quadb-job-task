import express from "express";
import dotenv from "dotenv";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./utils/feature.js";

//Importing Routes
import cryptoRoutes from "./routes/cryptoRoutes.js";
config({
  path: "./.env",
});

const app = express();
console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);
const mongoURI = process.env.MONGODB_URI;

const port = process.env.PORT || 4000;

connectDB(mongoURI);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/crypto", cryptoRoutes);

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
