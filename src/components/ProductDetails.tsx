import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const name = decodeURIComponent(searchParams.get("name") || "");
  const price = parseFloat(searchParams.get("price") || "0");
  const photoName = decodeURIComponent(searchParams.get("photoName") || "");
  const memoryClock = decodeURIComponent(searchParams.get("memoryClock") || "");
  const memorySize = decodeURIComponent(searchParams.get("memorySize") || "");
  const memoryType = decodeURIComponent(searchParams.get("memoryType") || "");
  const productDesc = decodeURIComponent(searchParams.get("productDesc") || "");
  const productCategory = decodeURIComponent(
    searchParams.get("productCategory") || ""
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: Number(id),
        name,
        price,
        photoName,
        specs: { memoryClock, memorySize, memoryType },
        soldOut: false,
        productCategory,
      })
    );
    toast.success(`${name} added to cart!`, {
      duration: 3000,
      icon: "🛒",
    });
  };

  const getCategoryDisplay = (category: string) => {
    console.log("getCategoryDisplay input:", category);
    const result = (() => {
      switch (category.toUpperCase()) {
        case "GPU":
          return "Graphics Card";
        case "CPU":
          return "Processor";
        case "RAM":
          return "Memory";
        case "STORAGE":
          return "Storage Device";
        case "MOTHERBOARD":
          return "Motherboard";
        default:
          return "Computer Component";
      }
    })();
    console.log("getCategoryDisplay output:", result);
    return result;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              className="h-full w-full object-cover md:object-center"
              src={`/${photoName}`}
              alt={name}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div
              className={`${
                productCategory === "GPU"
                  ? "bg-blue-500"
                  : productCategory === "CPU"
                  ? "bg-green-500"
                  : "bg-gray-500"
              }  text-white px-2 py-1 rounded-full inline-block mb-2`}
            >
              {getCategoryDisplay(productCategory)}
            </div>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {name}
            </h2>
            <p className="mt-4 text-xl text-gray-500"></p>
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Descrição do produto
              </h3>
              <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              
              {productDesc}
           
              </dl>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {price.toFixed(2)}
              </span>
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
