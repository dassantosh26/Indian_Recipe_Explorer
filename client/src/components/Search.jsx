/** @format */

import { useState, useEffect, useContext, useRef } from "react";
import { DishContext } from "../context/DishContext"; 
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { dishes } = useContext(DishContext); 
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const suggestionsRef = useRef();

  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]); 
      return;
    }

    // Filtering dishes based on the search query
    const filteredDishes = dishes.filter(
      (dish) =>
        dish.name?.toLowerCase().includes(value.toLowerCase()) ||
        dish.ingredients?.toLowerCase().includes(value.toLowerCase()) ||
        dish.state?.toString().toLowerCase().includes(value.toLowerCase()) // Converted state to string as some of the state is returning -1
    );
    setSuggestions(filteredDishes);
  };


  const handleSuggestionClick = (id) => {
    navigate(`/dish/${id}`);
    setQuery("");
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search dishes by name, ingredients, or state..."
        value={query}
        onChange={handleSearchChange}
      />

      {/* Suggestions Box */}
      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute bg-white text-black w-full mt-1 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          <ul>
            {suggestions.map((dish) => (
              <li
                key={dish._id}
                onClick={() => handleSuggestionClick(dish._id)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {dish.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
