import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      ingredients: {
        type: String,
        required: true,
      },
      diet: {
        type: String,
        required: true,
      },
      prep_time: {
        type: Number,
        required: true,
      },
      cook_time: {
        type: Number,
        required: true,
      },
      flavor_profile: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
      },
})

const Recipe = mongoose.model("Recipe", recipeSchema, "recipe_items")// Explicitly we nnned to specify as the collection name as it is already present in database;
export default Recipe;