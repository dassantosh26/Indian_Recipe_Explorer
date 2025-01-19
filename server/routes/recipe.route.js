/** @format */

import { Router } from "express";
import {
  getRecipe,
  addRecipe,
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipe.controller.js";

const recipeRouter = Router();
recipeRouter.get("/", getRecipe);
recipeRouter.post("/", addRecipe);
recipeRouter.delete("/:id", deleteRecipe);
recipeRouter.get("/:id", getRecipeById);
recipeRouter.put("/:id", updateRecipe);

export default recipeRouter;
