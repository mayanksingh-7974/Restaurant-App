import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

// Connect Database
connectDb();

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/category", categoryRoutes);


// Home route
app.get("/", (req, res) => {
  res.status(200).send(
    "<h1>🍔 Welcome to the Food Server App</h1>"
  );
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`.green
  );
});