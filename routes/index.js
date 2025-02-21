import express from "express";
import {
  home,
  addDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../controllers/index.js";

const app = express();
app.get("/", home);

app.post("/add-destination", addDestination);
app.get("/destinations", getAllDestinations);
app.get("/destinations/:id", getDestinationById);
app.put("/destinations/:id", updateDestination);
app.delete("/destinations/:id", deleteDestination);

export default app;
