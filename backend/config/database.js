//MongoDB connection setup

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    /* CAN force mongo to use specified db with dbName if env file doesnt specify
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "app_collections", // Explicitly set database name
    }); */
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

export default connectDB;

