import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import TopMenu from "./components/TopMenu";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
   
      <TopMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;