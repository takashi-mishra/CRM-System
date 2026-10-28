import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};