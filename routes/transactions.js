// routes/transactions.js
import express from "express";

const router = express.Router();

// In-memory storage for now (ok for class project)
let transactions = [];
let budgetLimit = 0; // simple global monthly budget (for demo)

// Helper: start of current month
function getStartOfCurrentMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

// GET all transactions
router.get("/", (req, res) => {
  res.json(transactions);
});

// POST create a transaction
router.post("/", (req, res) => {
  const { amount, category, type, description } = req.body;

  if (!amount || !category || !type) {
    return res
      .status(400)
      .json({ message: "amount, category, and type are required" });
  }

  const newTransaction = {
    id: Date.now().toString(),
    amount: Number(amount),
    category,
    type, // "income" or "expense"
    description: description || "",
    date: new Date().toISOString(),
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// PUT update a transaction by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount, category, type, description } = req.body;

  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const existing = transactions[index];

  const updated = {
    ...existing,
    amount: amount !== undefined ? Number(amount) : existing.amount,
    category: category || existing.category,
    type: type || existing.type,
    description: description !== undefined ? description : existing.description,
  };

  transactions[index] = updated;
  res.json(updated);
});

// DELETE transaction by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const deleted = transactions[index];
  transactions = transactions.filter((t) => t.id !== id);

  res.json({ message: "Transaction deleted", deleted });
});

// POST set budget limit
router.post("/budget", (req, res) => {
  const { limit } = req.body;

  if (limit === undefined || isNaN(Number(limit))) {
    return res.status(400).json({ message: "A numeric 'limit' is required" });
  }

  budgetLimit = Number(limit);
  res.json({ message: "Budget limit updated", budgetLimit });
});

// GET budget status (spent vs limit this month)
router.get("/budget/status", (req, res) => {
  const startOfMonth = getStartOfCurrentMonth();

  const thisMonthExpenses = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      t.type === "expense" &&
      date >= startOfMonth &&
      date <= new Date()
    );
  });

  const totalSpent = thisMonthExpenses.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  const remaining = budgetLimit - totalSpent;

  res.json({
    budgetLimit,
    totalSpent,
    remaining,
    isOverBudget: remaining < 0,
  });
});

// GET monthly summary (income + expenses for current month)
router.get("/summary/monthly", (req, res) => {
  const startOfMonth = getStartOfCurrentMonth();

  const thisMonth = transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startOfMonth && date <= new Date();
  });

  const totalIncome = thisMonth
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalExpenses = thisMonth
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  res.json({
    monthStart: startOfMonth.toISOString(),
    totalIncome,
    totalExpenses,
    net: totalIncome - totalExpenses,
    transactionCount: thisMonth.length,
  });
});

export default router;