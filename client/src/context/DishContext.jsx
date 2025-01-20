/** @format */


import { useEffect } from "react";
import { useState, useContext } from "react";
import { createContext } from "react";
import recipeApi from "../api/recipeApi";

export const DishContext = createContext();
export const useDishContext = () => useContext(DishContext);
export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDishes = async () => {
    try {
      const response = await recipeApi.get("/");
      // console.log(response.data);
      setDishes(response.data.recipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <DishContext.Provider value={{ dishes, loading, error, fetchDishes }}>
      {children}
    </DishContext.Provider>
  );
};
