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

const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={NextRoute1()} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticate" element={NextRoute2()} />
        <Route path="/activate" element={NextRoute3()} />
        <Route path="/rooms" element={NextRoute4()} />
      </Routes>
    </BrowserRouter>
  );
}

const NextRoute1 = () => {
  return isAuth ? <Navigate to="/rooms" replace /> : <Home />;
};

const NextRoute2 = () => {
  return isAuth ? <Navigate to="/rooms" replace /> : <Authenticate />;
};

const NextRoute3 = () => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : !user.activated ? (
    <Activate />
  ) : (
    <Navigate to="/rooms" replace />
  );
};

const NextRoute4 = () => {
  return !isAuth ? (
    <Navigate to="/" replace />
  ) : !user.activated ? (
    <Navigate to="/activate" replace />
  ) : (
    <Rooms />
  );
};

export default App;
