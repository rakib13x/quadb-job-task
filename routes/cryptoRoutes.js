import express from "express";

import cryptoController from "../controllers/cryptoController.js";

const app = express.Router();

app.get("/data", cryptoController);

export default app;
