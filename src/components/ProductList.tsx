import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts, Product } from "../store/productsSlice";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems: products, status, error, searchTerm } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center text-2xl text-red-500 p-8 bg-red-100 rounded-lg max-w-2xl mx-auto mt-10">
        <p>Error: {error}</p>
        <button 
          onClick={() => dispatch(fetchProducts())} 
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Computer Components"}
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const productUrl = `/product/${product.id}?` + new URLSearchParams({
    name: product.name,
    price: product.price.toString(),
    photoName: product.photoName,
    memoryClock: product.specs.memoryClock,
    memorySize: product.specs.memorySize,
    memoryType: product.specs.memoryType
  }).toString();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <Link to={productUrl} className="block relative h-48">
        <img
          src={product.photoName}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.soldOut && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
            Sold Out
          </div>
        )}
      </Link>
      <div className="p-6">
        <Link to={productUrl}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4">
          {product.specs.memorySize} {product.specs.memoryType}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            R$ {product.price.toFixed(2)}
          </span>
          <Link
            to={productUrl}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;