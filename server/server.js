
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import job application API routes
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Job application API
app.use("/api/applications", applicationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to CareerTrack API!");
});

// Health-check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CareerTrack server is running",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected",
  });
});

// Start server after checking the database URI
async function startServer() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error(
      "MongoDB connection failed: MONGODB_URI is missing from server/.env"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Atlas connected successfully!");

    app.listen(PORT, () => {
      console.log(`CareerTrack server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
