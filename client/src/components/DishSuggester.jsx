/** @format */
import { useState, useContext, useEffect, useRef } from "react";
import { DishContext } from "../context/DishContext";
import banner from "./../assets/WhatsApp Image 2025-01-19 at 12.44.58 AM.jpeg";

const DishSuggester = () => {
  const { dishes } = useContext(DishContext);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedDishes, setSuggestedDishes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Extracting all unique ingredients
  const allIngredients = new Set();
  dishes.forEach((dish) => {
    const ingredients = dish.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    ingredients.forEach((ingredient) => allIngredients.add(ingredient));
  });
  const uniqueIngredients = Array.from(allIngredients);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Showing suggestions based on input
    if (value.trim()) {
      const filteredSuggestions = uniqueIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(value.toLowerCase())
      );
      setIngredientSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setIngredientSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Adding ingredient on Enter key press, button click, or suggestion click
  const addIngredient = (ingredient) => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient && !selectedIngredients.includes(trimmedIngredient)) {
      const updatedIngredients = [...selectedIngredients, trimmedIngredient];
      setSelectedIngredients(updatedIngredients);
      setInputValue("");
      setIngredientSuggestions([]);
      setShowSuggestions(false);
      suggestDishes(updatedIngredients);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addIngredient(inputValue);
    }
  };

  // Removing an ingredient
  const removeIngredient = (ingredient) => {
    const updatedIngredients = selectedIngredients.filter(
      (item) => item !== ingredient
    );
    setSelectedIngredients(updatedIngredients);
    suggestDishes(updatedIngredients);
  };

  // Suggestion dishes based on selected ingredients
  const suggestDishes = (ingredients) => {
    if (ingredients.length === 0) {
      setSuggestedDishes([]);
      return;
    }

    const suggestions = dishes.filter((dish) =>
      ingredients.every((ingredient) =>
        dish.ingredients.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    setSuggestedDishes(suggestions);
  };

  // Closing suggestions box when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start">
        {/* Left Side: Banner Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
          <img src={banner} alt="" className="object-cover w-full h-full" />
        </div>

        {/* Right Side: Content */}
        <div className="w-full p-4 lg:w-1/2 lg:overflow-y-auto">
          <h2 className="mb-4 text-2xl font-bold">Dish Suggester</h2>
          <div className="relative flex mb-4 lg:w-[500px] w-[340px] md:w-[420px]">
            <input
              type="text"
              placeholder="Add an ingredient"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={() => addIngredient(inputValue)}
              className="px-10 ml-2 text-white rounded bg-custom-header-color"
            >
              Add
            </button>

            {/* Ingredient Suggestions */}
            {showSuggestions && ingredientSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-full max-h-48"
              >
                <ul>
                  {ingredientSuggestions.map((ingredient, index) => (
                    <li
                      key={index}
                      onClick={() => addIngredient(ingredient)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Selected Ingredients */}
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Selected Ingredients:
            </h3>
            <ul className="mb-4">
              {selectedIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="inline-block px-2 py-1 mb-2 mr-2 bg-gray-200 rounded"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Dishes */}
          <div>
            <h3 className="mb-2 text-xl font-semibold">Suggested Dishes:</h3>
            {suggestedDishes.length > 0 ? (
              <ul>
                {suggestedDishes.map((dish) => (
                  <li key={dish._id} className="p-2 mb-2 border-b">
                    <strong>{dish.name}</strong> - {dish.ingredients}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No dishes match the selected ingredients.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishSuggester;
