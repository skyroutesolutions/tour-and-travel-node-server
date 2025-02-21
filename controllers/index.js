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
