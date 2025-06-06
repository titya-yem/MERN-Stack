import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";
import userRoutes from "./routes/user.route";

const app = express();
dotenv.config();
connectDB();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes)


// Login route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
