import React from "react";
import { LibraryRoot } from "./style";
import "./style.css";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { NavbarMock } from "../mock/pages";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];
  return (
    <LibraryRoot className="root">
      <Navbar />
      <Routes>
        <Route
          path={"/"}
          element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path={"/login"}
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route path={"*"} element={<h1>Not Found</h1>} />
        {NavbarMock.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
      </Routes>
    </LibraryRoot>
  );
};

export default Root;
