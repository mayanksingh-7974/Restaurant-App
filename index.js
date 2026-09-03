import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import testRoutes from "./routes/testRoutes.js";
import connectDb from "./config/db.js";

dotenv.config();

//db connection
connectDb();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/v1/test", testRoutes);

app.get("/", (req, res) => {
  res.status(200).send("<h1>🍔 Welcome to the Food Server App</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`.green);
});