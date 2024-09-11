import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts, Product } from "../store/productsSlice";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-center text-2xl text-red-500">Error: {error}</div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Computer Components</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={product.photoName}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="mt-4 block w-full text-center bg-priceGreen text-white py-2 rounded font-bold ">
            R$ {product.price.toFixed(2)}
          </p>
  
          {product.soldOut && (
            <p className="mt-2 text-red-500 font-semibold">Sold Out</p>
          )}
          <Link
            to={productUrl}
            className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            View More
          </Link>
        </div>
      </div>
    );
  };
export default ProductList;
