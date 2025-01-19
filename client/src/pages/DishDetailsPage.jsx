/** @format */
import  { useContext } from "react";
import { useParams } from "react-router-dom";
import { DishContext } from "../context/DishContext";
import DishDetails from "../components/DishDetails";

const DishDetailsPage = () => {
  const { id } = useParams();
  const { dishes } = useContext(DishContext);

  const dish = dishes.find((d) => d._id === id);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dish Details</h1>
      <DishDetails dish={dish} /> {/* Use the DishDetails component */}
    </div>
  );
};

export default DishDetailsPage;
