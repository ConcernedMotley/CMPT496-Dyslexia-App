//MongoDB connection setup

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dyslexia_app_collections", //explicitly set db name and force mongo to use it

    });
    console.log("MongoDB Connected to dyslexia_collections");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

export default connectDB;

