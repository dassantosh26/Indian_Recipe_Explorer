/** @format */

// /** @format */

import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import recipeRouter from "./routes/recipe.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://indian-recipe-explorer.onrender.com",
    credentials: true,
  })
);
app.use("/api/v1/recipe", recipeRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
