import React from "react";
import { BsCartFill } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

const TopMenu: React.FC = () => {
  return (
    <nav className="flex justify-around items-center p-8 bg-black text-neutral-50">
      <Link to="/">
        <img
          src="/productsImg/logo.png" // Changed to absolute path
          alt="Company Logo"
          className="h-28 w-28"
        />
      </Link>

      <div className="flex w-9/12 h-11 justify-center font-bold">
        <input
          type="search"
          placeholder="Search your product here"
          className="w-10/12 p-2 mx-5 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          className="bg-gray-700 px-4 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Search"
        >
          <SlMagnifier className="hover:text-cyan-400" />
        </button>
      </div>

      <button
        className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full p-2"
        aria-label="Shopping Cart"
      >
        <BsCartFill className="text-3xl hover:text-cyan-400" />
      </button>
    </nav>
  );
};

export default TopMenu;
