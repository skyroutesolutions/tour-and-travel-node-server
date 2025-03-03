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

// 📌 API Endpoints for Tour packages

export const addTourPackage = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const { image, location, title, description, price, type, Language } = req.body;

    if (!image || !location || !title || !description || !price || !type || !Language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTour = {
      image,
      location,
      title,
      description,
      rating: 0,         // Initial rating
      ratingCount: 0,    // Number of ratings
      price,
      type,
      Language,
      ratings: [],       // Stores individual user ratings
      createdAt: new Date(),
    };

    await tours.insertOne(newTour);
    res.status(201).json({ message: "Tour package successfully added", data: newTour });
  } catch (error) {
    console.error("❌ Error adding tour package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTourPackages = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const allTours = await tours.find().toArray();
    res.status(200).json(allTours);
  } catch (error) {
    console.error("❌ Error fetching tour packages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTourPackageById = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const { id } = req.params;
    const tour = await tours.findOne({ _id: new ObjectId(id) });

    if (!tour) {
      return res.status(404).json({ message: "Tour package not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    console.error("❌ Error fetching tour package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTourPackage = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const { id } = req.params;
    const { image, location, title, description, price, type, Language } = req.body;

    const updatedData = { image, location, title, description, price, type, Language };

    const updateResult = await tours.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Tour package not found" });
    }

    res.status(200).json({ message: "Tour package updated successfully" });
  } catch (error) {
    console.error("❌ Error updating tour package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTourPackage = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const { id } = req.params;
    const deleteResult = await tours.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Tour package not found" });
    }

    res.status(200).json({ message: "Tour package deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting tour package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addRating = async (req, res) => {
  try {
    const db = await getDatabase();
    const tours = db.collection("tour_packages");

    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const tour = await tours.findOne({ _id: new ObjectId(id) });

    if (!tour) {
      return res.status(404).json({ message: "Tour package not found" });
    }

    // Update ratings array
    const updatedRatings = [...tour.ratings, rating];

    // Calculate new average rating
    const newRating = updatedRatings.reduce((sum, r) => sum + r, 0) / updatedRatings.length;

    const updateResult = await tours.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ratings: updatedRatings, 
          rating: parseFloat(newRating.toFixed(1)), 
          ratingCount: updatedRatings.length 
        } 
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to update rating" });
    }

    res.status(200).json({ message: "Rating added successfully", newRating: newRating.toFixed(1) });
  } catch (error) {
    console.error("❌ Error adding rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 API Endpoints for Blogs

export const addBlog = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const { author, title, description, image, content, duration } = req.body;

    if (!author || !title || !description || !image || !content || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = {
      author,
      title,
      description,
      image,
      content,
      duration,
      postedAt: new Date(),
      comments: [], // Initially empty
    };

    await blogs.insertOne(newBlog);
    res.status(201).json({ message: "Blog successfully added", data: newBlog });
  } catch (error) {
    console.error("❌ Error adding blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const allBlogs = await blogs.find().toArray();
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const { id } = req.params;
    const blog = await blogs.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const { id } = req.params;
    const { author, title, description, image, content, duration } = req.body;

    const updatedData = { author, title, description, image, content, duration };

    const updateResult = await blogs.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("❌ Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const { id } = req.params;
    const deleteResult = await blogs.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const db = await getDatabase();
    const blogs = db.collection("blogs");

    const { id } = req.params;
    const { author, content } = req.body;

    if (!author || !content) {
      return res.status(400).json({ message: "Author and content are required" });
    }

    const blog = await blogs.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = {
      author,
      content,
      time: new Date(),
    };

    const updateResult = await blogs.updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: newComment } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to add comment" });
    }

    res.status(200).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("❌ Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
