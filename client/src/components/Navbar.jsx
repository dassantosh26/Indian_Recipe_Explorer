/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-6 lg:justify-end md:justify-center">
      <Link
        to="/"
        className="text-2xl lg:text-3xl hover:text-green-900 dancing-script"
      >
        Home
      </Link>

      {user ? (
        <Link
          to="/dishList"
          className="text-2xl lg:text-3xl hover:text-green-900 dancing-script"
        >
          Dish-List
        </Link>
      ) : (
        <></>
      )}
      {user ? (
        <Link
          to="/suggester"
          className="text-2xl hover:text-green-900 dancing-script lg:text-3xl"
        >
          Dish Suggester
        </Link>
      ) : (
        <></>
      )}
      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-2xl cursor-pointer dancing-script lg:text-3xl ">
            {user.username}
          </span>
          <button
            onClick={() => logout(navigate)}
            className="p-2 text-xl text-white bg-green-900 rounded-md dancing-script lg:text-2xl"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="p-2 text-xl text-white bg-green-900 rounded-md dancing-script lg:text-2xl"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
