import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Sweets from "./Sweets";
import Drinks from "./Drinks";
import Desserts from "./Desserts";
import Cart from "./Cart"; 
import Breakfast from "./Breakfast";
import Snacks from "./Snacks";
import ContactUs from "./ContactUs";
import FastFood from "./Fastfood";
import Soups from "./Soups";
import Bakery from "./Bakery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Orders";

function App() {
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
    <ToastContainer/>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/home">FoodZone</Link>

          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/veg">Veg Items</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/nonveg">Non Veg Items</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sweets">Sweets</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/breakfast">Breakfast</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/snacks">Snacks</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/drinks">Drinks</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/fastfood">FastFood</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/desserts">Desserts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/soups">Soups</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/bakery">Bakery</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Cart ({cartCount})</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contactus">ContactUs</Link></li>
            </ul>
          </div>

        </div>
      </nav>

      <div className="container-fluid mt-4">
        <Routes>
                  <Route path="/" element={<Navigate to="/veg" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/sweets" element={<Sweets />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/snacks" element={<Snacks/>} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/fastfood" element={<FastFood />} />
          <Route path="/soups" element={<Soups />} />
          <Route path="/bakery" element={<Bakery />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/contactus" element={<ContactUs />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
