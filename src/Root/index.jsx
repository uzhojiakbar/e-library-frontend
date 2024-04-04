import React, { useState } from "react";
import { LibraryRoot } from "./style";
import "./style.css";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { NavbarMock } from "../mock/pages";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Book from "../components/Book";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];

  const [CurrentBooks, setCurrentBooks] = useState("");

  return (
    <LibraryRoot className="root">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route
          path="/book/:id"
          element={<Book CurrentBooks={CurrentBooks} />}
        />

        <Route
          path={"/"}
          element={<Home setCurrentBooks={setCurrentBooks} />}
        />
        <Route
          path={"/login"}
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        <Route path={"*"} element={<NotFound />} />
        {NavbarMock.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
      </Routes>
    </LibraryRoot>
  );
};

export default Root;
