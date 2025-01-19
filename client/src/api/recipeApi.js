/** @format */

import axios from "axios";

const api_url = import.meta.env.VITE_RECIPE_API_URL;

const recipeApi = axios.create({
  baseURL: api_url,
});

//Response interceptor
recipeApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
export const fetchRecipes = () => recipeApi.get("/");


export const addRecipe = (newRecipe) => recipeApi.post("/", newRecipe);


export const deleteRecipe = (id) => recipeApi.delete(`/${id}`);


export const fetchRecipeById = (id) => recipeApi.get(`/${id}`); 

export const updateRecipe = (id, updatedRecipe) =>
  recipeApi.put(`/${id}`, updatedRecipe); 

export default recipeApi;
