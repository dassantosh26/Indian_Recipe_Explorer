/** @format */

import { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/recipeApi";
import { toast } from "react-toastify";
import { DishContext } from "../context/DishContext";

const AddDishForm = () => {
  const navigate = useNavigate();
  const { fetchDishes } = useContext(DishContext);

  // State to hold the new dish data
  const [newDish, setNewDish] = useState({
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRecipe(newDish);
      if (response.data.success) {
        fetchDishes();
        toast.success("Dish added successfully!");
        navigate("/dishList");
      }
    } catch (error) {
      console.error("Error adding dish:", error);
      toast.error("Failed to add dish.");
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Dish
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newDish.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Ingredients Field */}
          <TextField
            fullWidth
            label="Ingredients"
            name="ingredients"
            value={newDish.ingredients}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Diet Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Diet</InputLabel>
            <Select
              name="diet"
              value={newDish.diet}
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
            value={newDish.prep_time}
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
            value={newDish.cook_time}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Flavor Profile Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Flavor Profile</InputLabel>
            <Select
              name="flavor_profile"
              value={newDish.flavor_profile}
              onChange={handleChange}
              label="Flavor Profile"
              required
            >
              <MenuItem value="sweet">Sweet</MenuItem>
              <MenuItem value="spicy">Spicy</MenuItem>
              <MenuItem value="sour">Sour</MenuItem>
            </Select>
          </FormControl>

          {/* Course Field (Dropdown) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={newDish.course}
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
            value={newDish.state}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Region Field */}
          <TextField
            fullWidth
            label="Region"
            name="region"
            value={newDish.region}
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
            Add Dish
          </Button>

          {/* Cancel Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/dishList")}
            sx={{ mb: 2 }}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddDishForm;


