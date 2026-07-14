import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("URI Loaded:", MONGODB_URI ? "YES" : "NO");
console.log("Ready State:", mongoose.connection.readyState);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}