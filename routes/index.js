import express from "express";
import {
  home,
} from "../controllers/index.js";

const app = express();
app.get("/", home);

export default app;
