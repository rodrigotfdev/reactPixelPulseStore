import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/productsSlice";
import { RootState } from "../store/store";
import { BsCartFill } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cart from "./Cart";

const TopMenu: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

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

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="flex justify-around items-center p-8 bg-black text-neutral-50">
        <Link to="/">
          <img
            src="/productsImg/main-logo.png"
            alt="Company Logo"
            className="w-44"
          />
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex w-9/12 h-11 justify-center font-bold"
        >
          <input
            type="search"
            placeholder="Pesquise seu produto desejado aqui"
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

        <div className="relative">
          <button
            onClick={toggleCart}
            className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full p-2"
            aria-label="Shopping Cart"
          >
            <BsCartFill className="text-3xl hover:text-cyan-400" />
          </button>
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartItemsCount}
            </span>
          )}
        </div>
      </nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default TopMenu;
