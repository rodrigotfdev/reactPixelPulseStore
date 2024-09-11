import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/productsSlice";
import { BsCartFill } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { Link, useNavigate, useLocation } from "react-router-dom";

const TopMenu: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (location.pathname !== "/") {
      setSearchInput("");
    }
  }, [location]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchInput(newSearchTerm);
    dispatch(setSearchTerm(newSearchTerm));
    
  
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    navigate("/");
  };

  return (
    <nav className="flex justify-around items-center p-8 bg-black text-neutral-50">
      <Link to="/">
        <img
          src="/productsImg/logo.png"
          alt="Company Logo"
          className="h-28 w-28"
        />
      </Link>

      <form onSubmit={handleSubmit} className="flex w-9/12 h-11 justify-center font-bold">
        <input
          type="search"
          placeholder="Search your product here"
          className="w-10/12 p-2 mx-5 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={searchInput}
          onChange={handleSearch}
        />
        <button
          type="submit"
          className="bg-gray-700 px-4 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Search"
        >
          <SlMagnifier className="hover:text-cyan-400" />
        </button>
      </form>

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