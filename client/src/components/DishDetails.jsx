/** @format */

import { Link } from "react-router-dom";
import banner from "./../assets/top-view-italian-pasta-with-meat-grey-space.jpg";

const DishDetails = ({ dish }) => {
  if (!dish) {
    return <p>Dish not found.</p>;
  }

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "65vh",
      }}
    >
      <div className="flex items-center justify-center ">
        <div
          className="p-3 rounded-lg shadow-lg w-96 bg-white/70 backdrop-blur-md"
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Name:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.name}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Ingredients:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.ingredients}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Diet:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.diet}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Prep Time:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.prep_time} mins
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Cook Time:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.cook_time} mins
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Flavor:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.flavor_profile}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Course:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.course}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              State:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.state}
            </span>
          </p>
          <p>
            <span className="text-md lg:text-2xl space-mono-regular">
              Region:
            </span>
            <span className="mr-2 font-bold text-md lg:text-3xl dancing-script ">
              {dish.region}
            </span>
          </p>
          <Link
            to="/"
            className="inline-block px-4 py-2 mt-4 text-white rounded bg-custom-header-color hover:bg-green-500"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
