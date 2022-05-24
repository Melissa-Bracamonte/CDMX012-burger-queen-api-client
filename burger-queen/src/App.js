import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./database/UserProvider";
import Login from "./components/login/Login";
import Signup from "./components/signUp/Signup";
import Home from "./components/home/Home";
import "./App.css";
import Products from "./components/products/Products";

function App() {
  const { user } = useContext(UserContext);
  //const userRole = user.photoURL;
  // console.log(userRole)

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      {/* {userRole === "administrador" && ( */}
      <Route exact path="/signup" element={<Signup />} />
      {/* )} */};{user && <Route exact path="/home" element={<Home />} />}
      <Route exact path="/products" element={<Products/>} />
    </Routes>
  );
}

export default App;
