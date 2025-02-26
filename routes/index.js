import express from "express";
import {
  home,
  addDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  addTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  addService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/index.js";

const app = express();
app.get("/", home);

app.post("/add-destination", addDestination);
app.get("/destinations", getAllDestinations);
app.get("/destinations/:id", getDestinationById);
app.put("/destinations/:id", updateDestination);
app.delete("/destinations/:id", deleteDestination);

app.post("/add-testimonial", addTestimonial);
app.get("/testimonials", getAllTestimonials);
app.get("/testimonials/:id", getTestimonialById);
app.put("/testimonials/:id", updateTestimonial);
app.delete("/testimonials/:id", deleteTestimonial);

app.post("/add-service", addService);
app.get("/services", getAllServices);
app.get("/services/:id", getServiceById);
app.put("/services/:id", updateService);
app.delete("/services/:id", deleteService);

export default app;
