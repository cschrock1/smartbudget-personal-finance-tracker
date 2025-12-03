import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import * as authRoutes from "./routes/auth.js";
import * as transactionRoutes from "./routes/transactions.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Basic test route
app.get("/", (req, res) => {
  res.send("SmartBudget API is running ✅");
});

// Mount routes
app.use("/api/auth", authRoutes.default);
app.use("/api/transactions", transactionRoutes.default);

const PORT = process.env.PORT || 8080;

// ✅ Start the server first
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to MongoDB in the background
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // short timeout for Cloud Run
    })
    .then(() => console.log("MongoDB connected ✅"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
});