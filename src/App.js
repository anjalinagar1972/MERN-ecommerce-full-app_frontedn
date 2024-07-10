import React, { useContext, useEffect } from "react";
import AppContext from "./Context/App_Context";
import Show_Product from "./Components/Product/Show_Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product_details from "./Components/Product/Product_details";
import Navbar from "./Components/Navbar";
import Search_product from "./Components/Product/Search_product";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Components/User/Profile";
import Cart from './Components/Cart'
import Address from './Components/Address'
import Checkout from "./Components/Checkout";
import Ordert_confirmation from "./Components/Order_Confirmation"

const App = () => {
  // const {data} = useContext(AppContext)
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1495}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Show_Product />} />
          <Route
            path="/get/single/product/search/:term"
            element={<Search_product />}
          />
          <Route path="/get/single/product/:id" element={<Product_details />} />
          <Route path="/create/new/user" element={<Register />} />
          <Route path="/login/user/user" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/confirmation" element={<Ordert_confirmation />} />





        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
