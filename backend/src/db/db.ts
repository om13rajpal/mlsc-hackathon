import mongoose from "mongoose";
import { MONGO_URI } from "../config/config";

function connectDB() {
  mongoose
    .connect(MONGO_URI!)
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((err) => {
      console.log("Error connecting to Mongo DB", err);
      process.exit(1);
    });
}

export default connectDB;