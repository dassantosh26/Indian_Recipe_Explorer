/** @format */

import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "food_recipe", // Specifying the database name as it is already present
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error in connecting with Database", error);
    process.exit(1);
  }
};
export default connectDb;
