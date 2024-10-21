import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts, Product, setCurrentPage } from "../store/productsSlice";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredItems: products,
    status,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    totalPages,
  } = useSelector((state: RootState) => state.products);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => dispatch(setCurrentPage(pageNumber));

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
    <div
      ref={listRef}
      className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          {searchTerm
            ? `Search Results for "${searchTerm}"`
            : "Featured Computer Components"}
        </h2>
        {currentItems.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No products found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const productUrl =
    `/product/${product.id}?` +
    new URLSearchParams({
      name: product.name,
      price: product.price.toString(),
      photoName: product.photoName,
      productFamily: product.productFamily,
    }).toString();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <Link to={productUrl} className="block relative h-48">
        <img
          src={product.photoName}
          alt={product.name}
          className="w-full h-full object-contain"
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
        <p
          className={`${
            product.productFamily === "GPU"
              ? "bg-blue-500"
              : product.productFamily === "CPU"
              ? "bg-green-500"
              : "bg-gray-500"
          }  text-white px-2 py-1 rounded-full inline-block mb-2`}
        >
          {product.productFamily}
        </p>
      
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            R$ {product.price.toFixed(2)}
          </span>
          <Link
            to={productUrl}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}> = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-2 rounded-lg ${
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProductList;
