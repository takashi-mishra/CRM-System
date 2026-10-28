import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./Config/env.js";
import apiRoutes from "./Routes/health.routes.js";
import { notFoundMiddleware } from "./Middlewares/not-found.middleware.js";
import { errorMiddleware } from "./Middlewares/error.middleware.js";

const app = express();

// Add security-related HTTP headers.
app.use(helmet());

// Allow requests from our configured frontend.
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// Parse incoming JSON request bodies.
app.use(express.json({ limit: "1mb" }));

// Parse URL-encoded form submissions.
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Log HTTP requests during development.
if (!env.isProduction) {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,  
  message: "Real Estate CRM API is running",
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV ?? "development",
  });
} 
);

// Register versioned API routes.
app.use("/api/v1", apiRoutes);

// Handle requests that do not match any route.
app.use(notFoundMiddleware);

// Handle application errors.
app.use(errorMiddleware);

export default app;