/** @format */

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeById, updateRecipe } from "../api/recipeApi";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState({
    name: "",
    ingredients: "",
    diet: "",
    prep_time: "",
    cook_time: "",
    flavor_profile: "",
    course: "",
    state: "",
    region: "",
  });

  // Fetching the dish details when the component mounts
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetchRecipeById(id);
        setDish(response.data.recipe);
      } catch (error) {
        console.error("Error fetching dish:", error);
        toast.error("Failed to fetch dish details.");
      }
    };
    fetchDish();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish({ ...dish, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Updating dish with ID:", id);
      // console.log("Payload being sent:", dish);
      const response = await updateRecipe(id, dish);

      setDish(response.data.recipe);

      toast.success("Dish updated successfully!");
      navigate("/dishList");
    } catch (error) {
      console.error("Error updating dish:", error);
      toast.error("Failed to update dish.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Dish
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={dish.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Ingredients Field */}
          <TextField
            fullWidth
            label="Ingredients"
            name="ingredients"
            value={dish.ingredients}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Diet Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Diet</InputLabel>
            <Select
              name="diet"
              value={dish.diet}
              onChange={handleChange}
              label="Diet"
              required
            >
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non vegetarian">Non-Vegetarian</MenuItem>
            </Select>
          </FormControl>

          {/* Prep Time Field */}
          <TextField
            fullWidth
            label="Prep Time (mins)"
            name="prep_time"
            type="number"
            value={dish.prep_time}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Cook Time Field */}
          <TextField
            fullWidth
            label="Cook Time (mins)"
            name="cook_time"
            type="number"
            value={dish.cook_time}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Flavor Profile Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Flavor Profile</InputLabel>
            <Select
              name="flavor_profile"
              value={dish.flavor_profile}
              onChange={handleChange}
              label="Flavor Profile"
              required
            >
              <MenuItem value="sweet">Sweet</MenuItem>
              <MenuItem value="spicy">Spicy</MenuItem>
              <MenuItem value="sour">Sour</MenuItem>
              <MenuItem value="bitter">Bitter</MenuItem>
            </Select>
          </FormControl>

          {/* Course Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={dish.course}
              onChange={handleChange}
              label="Course"
              required
            >
              <MenuItem value="main course">Main Course</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
              <MenuItem value="appetizer">Appetizer</MenuItem>
            </Select>
          </FormControl>

          {/* State Field */}
          <TextField
            fullWidth
            label="State"
            name="state"
            value={dish.state}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Region Field */}
          <TextField
            fullWidth
            label="Region"
            name="region"
            value={dish.region}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Dish
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditDish;
