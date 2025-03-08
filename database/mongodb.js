import mongoose from "mongoose";

import { MONGO_URL, NODE_ENV } from "../config/env.js";

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to MongoDB ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
