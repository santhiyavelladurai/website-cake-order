import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Cakes from "./components/Cakes";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogins from "./admin/AdminLogins";
import AdminOrders from "./admin/AdminOrders";
import AdminDashboard from "./admin/AdminDashboard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/v1/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Product addToCart={addToCart} products={products} />
            </>
          }
        />

        <Route
          path="/cakes"
          element={<Cakes addToCart={addToCart} products={products} />}
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogins />} />
<Route path="/admin/orders" element={<AdminOrders />} />

<Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route
          path="/buy-now"
          element={
            <ProtectedRoute>
              <BuyNow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQty={updateQty}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
