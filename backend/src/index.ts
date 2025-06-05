import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";

const app = express();
dotenv.config();
connectDB();

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript + Express!");
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
