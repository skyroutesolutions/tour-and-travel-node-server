import express from "express";
import indexRoutes from "./routes/index.js";
import { connectDB, closeDB } from "./database/config.js";

const app = express();
const PORT = process.env.PORT || 3000;

const run = () => {
  app.use(express.json());
  app.use("/api", indexRoutes);

  process.on("SIGINT", async () => {
    await closeDB();
    process.exit(0);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

connectDB()
  .then(() => {
    console.log("🚀 Database connected, ready to use\n\n");
    run();
  })
  .catch((err) => console.error("❌ DB Connection Failed:", err));
