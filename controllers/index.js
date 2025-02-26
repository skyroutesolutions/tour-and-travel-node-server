import { ObjectId } from "mongodb";
import { getDatabase } from "../database/config.js";
const db = await getDatabase();

// 💾 Database Collections
const destinations = db.collection("destinations");

export const home = (req, res) => {
  res.send("Server is successfully connected!");
}

// 📌 API Endpoints for Destinations

export const addDestination = async (req, res) => {
  try {

    const { name, image, location, description } = req.body;
    if (!name || !image || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDestination = { name, image, location, description, createdAt: new Date() };
    await destinations.insertOne(newDestination);

    res.status(201).json({ message: "Destination successfully added", data: newDestination });
  } catch (error) {
    console.error("❌ Error adding destination:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const allDestinations = await destinations.find().toArray();
    res.status(200).json(allDestinations);
  } catch (error) {
    console.error("❌ Error fetching destinations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await destinations.findOne({ _id: new ObjectId(id) });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    console.error("❌ Error fetching destination:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, location, description } = req.body;

    const updatedData = { name, image, location, description };
    const updateResult = await destinations.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination updated successfully" });
  } catch (error) {
    console.error("❌ Error updating destination:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await destinations.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting destination:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 API Endpoints for Testimonials

export const addTestimonial = async (req, res) => {
  try {
    const db = await getDatabase();
    const testimonials = db.collection("testimonials");

    const { content, rating, author, image } = req.body;
    if (!content || !rating || !author || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = { content, rating, author, image, createdAt: new Date() };
    await testimonials.insertOne(newTestimonial);

    res.status(201).json({ message: "Testimonial successfully added", data: newTestimonial });
  } catch (error) {
    console.error("❌ Error adding testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const db = await getDatabase();
    const testimonials = db.collection("testimonials");

    const allTestimonials = await testimonials.find().toArray();
    res.status(200).json(allTestimonials);
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const db = await getDatabase();
    const testimonials = db.collection("testimonials");

    const { id } = req.params;
    const testimonial = await testimonials.findOne({ _id: new ObjectId(id) });

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    console.error("❌ Error fetching testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const db = await getDatabase();
    const testimonials = db.collection("testimonials");

    const { id } = req.params;
    const { content, rating, author, image } = req.body;

    const updatedData = { content, rating, author, image };
    const updateResult = await testimonials.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial updated successfully" });
  } catch (error) {
    console.error("❌ Error updating testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const db = await getDatabase();
    const testimonials = db.collection("testimonials");

    const { id } = req.params;
    const deleteResult = await testimonials.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting testimonial:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 API Endpoints for Services

export const addService = async (req, res) => {
  try {
    const db = await getDatabase();
    const services = db.collection("services");

    const { image, location, title, content, secondaryText } = req.body;
    if (!image || !location || !title || !content || !secondaryText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = { image, location, title, content, secondaryText, createdAt: new Date() };
    await services.insertOne(newService);

    res.status(201).json({ message: "Service successfully added", data: newService });
  } catch (error) {
    console.error("❌ Error adding service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const db = await getDatabase();
    const services = db.collection("services");

    const allServices = await services.find().toArray();
    res.status(200).json(allServices);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const db = await getDatabase();
    const services = db.collection("services");

    const { id } = req.params;
    const service = await services.findOne({ _id: new ObjectId(id) });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("❌ Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const db = await getDatabase();
    const services = db.collection("services");

    const { id } = req.params;
    const { image, location, title, content, secondaryText } = req.body;

    const updatedData = { image, location, title, content, secondaryText };
    const updateResult = await services.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("❌ Error updating service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const db = await getDatabase();
    const services = db.collection("services");

    const { id } = req.params;
    const deleteResult = await services.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
