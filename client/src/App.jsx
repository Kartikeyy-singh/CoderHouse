import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";


function App() {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={NextRoute1(isAuth)} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticate" element={NextRoute2(isAuth)} />
        <Route path="/activate" element={NextRoute3(user, isAuth)} />
        <Route path="/rooms" element={NextRoute4(user,isAuth)} />
      </Routes>
    </BrowserRouter>
  );
}

const NextRoute1 = (isAuth) => {
  return isAuth ? <Navigate to="/rooms" replace /> : <Home />;
};

const NextRoute2 = (isAuth) => {
  return isAuth ? <Navigate to="/rooms" replace /> : <Authenticate />;
};

const NextRoute3 = (user,isAuth) => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : !user.activated ? (
    <Activate />
  ) : (
    <Navigate to="/rooms" replace />
  );
};

const NextRoute4 = (user,isAuth) => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : !user.activated ? (
    <Navigate to="/activate" replace />
  ) : (
    <Rooms />
  );
};

export default App;
