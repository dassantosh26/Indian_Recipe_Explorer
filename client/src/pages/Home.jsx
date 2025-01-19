/** @format */

import { useContext, useState } from "react";
import { DishContext } from "../context/DishContext";
import { formatValue } from "../utils/helpers";
import { Pagination } from "@mui/material"; // Import Pagination component
import { useNavigate } from "react-router-dom";
import dishes1 from "./../assets/fried-rice.png";
import flavr from "./../assets/salty-food-in-a-bowl.png";
import cooktime from "./../assets/chef.png";
import hotfood from "./../assets/main-dish.png";
import vegetarian from "./../assets/Pizza-2-570x368.jpg";
import nonVegetarian from "./../assets/slide1.jpg";

const Home = () => {
  const { dishes, loading, error } = useContext(DishContext);
  const navigate = useNavigate();
  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Map diet to specific image
  const getDishImage = (diet) => {
    if (diet === "vegetarian") return vegetarian;
    if (diet === "non vegetarian") return nonVegetarian;
    return vegetarian; // Default image
  };

  // Map diet to symbol
  const getDietSymbol = (diet) => {
    if (diet === "vegetarian") return "🟢";
    if (diet === "non vegetarian") return "🔴";
    return "";
  };

  // Calculate paginated dishes
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDishes = dishes.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedDishes.map((dish) => (
          <div
            key={dish._id}
            className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden rounded-lg">
              <img
                src={getDishImage(dish.diet)}
                alt={dish.name}
                className="object-cover w-full h-48 transition-transform duration-300 ease-in-out rounded-lg cursor-pointer hover:scale-125"
                onClick={() => navigate(`/dish/${dish._id}`)}
              />
            </div>
            <div className="p-4">
              <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold">
                <img src={dishes1} alt="" className="w-8" /> {dish.name}
                {getDietSymbol(dish.diet)}
              </h2>
              <p className="flex items-center gap-2 mb-1 text-gray-600">
                <span className="flex items-center gap-2 font-medium ">
                  <img src={hotfood} alt="" className="w-8" />
                  Course:
                </span>
                {dish.course}
              </p>
              <p className="flex items-center gap-2 mb-1 text-gray-600">
                <span className="flex items-center gap-2 font-medium">
                  <img
                    src={flavr}
                    alt=""
                    className="flex items-center w-8 gap-2 "
                  />
                  Flavor:
                </span>
                <span className="">{formatValue(dish.flavor_profile)}</span>
              </p>
              <p className="flex items-center gap-2 mb-1 text-gray-600 ">
                <span className="flex items-center gap-2 font-medium">
                  <img src={cooktime} alt="" className="w-8" />
                  Cook Time:
                </span>
                <span>{dish.cook_time} min</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(dishes.length / itemsPerPage)} // Total number of pages
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default Home;
