import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

// simple mock route for testing
app.get("/", (req, res) => {
  res.status(200).send("SmartBudget API is running");
});

describe("API Health Check", () => {
  test("GET / should return success message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("SmartBudget API is running");
  });
});