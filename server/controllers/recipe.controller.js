/** @format */
import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";

export const getRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json({ success: true, recipes, error: false });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const newRecipe = req.body;
    if (
      !newRecipe.name ||
      !newRecipe.ingredients ||
      !newRecipe.diet ||
      !newRecipe.prep_time ||
      !newRecipe.cook_time ||
      !newRecipe.flavor_profile ||
      !newRecipe.course ||
      !newRecipe.state ||
      !newRecipe.region
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const recipe = new Recipe(newRecipe);
    const result = await recipe.save();
    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      error: false,
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }

    const result = await Recipe.deleteOne({ _id: recipeId });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Recipe deleted successfully" });
    } else {
      res.status(404).json({ error: "Recipe not found", success: false });
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: error.message, success: false });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ success: true, recipe, error: false });
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};


// Update a recipe by ID
export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updates = req.body;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updates, {
      new: true, 
      runValidators: true,
    });
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe, 
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
