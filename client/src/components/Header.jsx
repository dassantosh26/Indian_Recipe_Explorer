/** @format */
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
  return (
    <header className="shadow-md bg-custom-header-color ">
      <div className="container flex flex-col gap-4 p-4 mx-auto lg:justify-around lg:flex-row lg:items-center">
        {/* Logo - 10% width */}
        <div className="lg:w-[10%] flex items-center w-full justify-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-24 h-24 mr-2 cursor-pointer"
            />
          </Link>
        </div>

        {/* Input Box - 40% width */}
        <div className="lg:w-[40%] w-full">
          <Search />
        </div>

        {/* Navbar - 50% width */}
        <div className="lg:w-[50%] w-full">
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
