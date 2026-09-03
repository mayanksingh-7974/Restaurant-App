import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>🍔 Welcome to the Food Server App</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`.green);
});