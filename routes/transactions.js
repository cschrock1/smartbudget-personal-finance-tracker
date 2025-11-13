import express from "express";
const router = express.Router();

const transactions = [];

router.get("/", (req, res) => {
  res.json(transactions);
});

router.post("/", (req, res) => {
  const { amount, category, type, description } = req.body;
  const newTransaction = { id: Date.now(), amount, category, type, description };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

export default router;
