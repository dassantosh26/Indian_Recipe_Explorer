/** @format */

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <Navbar />
      </Header>
      <main className="container flex-grow p-4 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
