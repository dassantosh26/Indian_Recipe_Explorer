/** @format */

import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
const ActionButtons = ({ dishId, onDelete }) => {
  const navigate = useNavigate();

  // Handle Edit: Navigate to the edit page
  const handleEdit = () => {
    navigate(`/edit-dish/${dishId}`);
  };

  // Handle Delete: Call the onDelete function passed as a prop
  const handleDelete = () => {
    onDelete(dishId);
  };
  const handleAdd = () => {
    navigate("/addDish");
  };

  return (
    <div className="flex justify-center items-center gap-5 ">
      <GrAdd className="text-lg cursor-pointer" onClick={handleAdd} />
      <FaEdit className="text-lg cursor-pointer" onClick={handleEdit} />
      <TiDelete className="text-2xl cursor-pointer" onClick={handleDelete} />
    </div>
  );
};

export default ActionButtons;
