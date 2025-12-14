import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.routes.js";

// load environment variables from env file
dotenv.config();
// intialize express app and variables
const app = express();
const port = process.env.PORT || 8080;
const env = process.env.ENV || "development";

// body parser middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// cookieParser Middleware
app.use(cookieParser());

// enable cors
app.use(cors());

// adding app routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);

// checking server health
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.ENV || "development",
  });
});

export default app;
