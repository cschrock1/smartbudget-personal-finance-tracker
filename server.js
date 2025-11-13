import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import * as authRoutes from "./routes/auth.js";
import * as transactionRoutes from "./routes/transactions.js";


dotenv.config(); // ✅ load env variables only once

console.log("Auth Routes Type:", typeof authRoutes);
console.log("Transaction Routes Type:", typeof transactionRoutes);

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("SmartBudget API is running ✅");
});

// ✅ Mount routes
app.use("/api/auth", authRoutes.default);
app.use("/api/transactions", transactionRoutes.default);


// ✅ Port setup
const PORT = process.env.PORT || 8080;

// ✅ Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
