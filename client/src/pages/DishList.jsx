/** @format */

/** @format */

import  { useEffect } from "react";
import DishTable from "../components/DishTable";
import { useDishContext } from "../context/DishContext";
import recipeApi from "../api/recipeApi";
import { toast } from "react-toastify";

const DishList = () => {
  const { dishes, fetchDishes } = useDishContext();

  const handleDelete = async (dishId) => {
    try {
      const response = await recipeApi.delete(`/${dishId}`);
      if (response.data.success) {
        // Check for response.data.success
        toast.success("Dish deleted successfully!");
        fetchDishes();
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
      toast.error("Failed to delete dish.");
    }
  };
  useEffect(() => {
    fetchDishes();
  }, []);
  return (
    <div>
      <h1 className="text-center text-xl font-bold">Dish Menu</h1>
      <DishTable data={dishes} onDelete={handleDelete} />
    </div>
  );
};

export default DishList;
