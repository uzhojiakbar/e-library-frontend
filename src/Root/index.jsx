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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];

  const [categories, setCategories] = useState([]);


  const [CurrentBooks, setCurrentBooks] = useState("");
  const [books, setBook] = useState([]);



  const FilerCategories = (filter) => {
    if (filter) {
      const data = categories.sort((a, b) => a.idForFilter - b.idForFilter);
      setCategories(data);
      console.log("Kategoriyalar filterlandi!");
      console.log(data);
    }
  };

  const getCategories = async (update = 0) => {
    if (categories.length === 0 || update === 1) {
      try {
        const CollenctionRef = collection(db, "category");
        const data = await getDocs(CollenctionRef);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));

        setCategories(getData);
        console.log("Categoriya yuklandi!");
      } catch (error) {
        console.error(error);
        console.log("Categoriya yuklanmadi!");
      }
    }
  };

  const getBooks = async () => {
    if (books.length === 0) {
      try {
        const BookCollection = collection(db, "files");
        const data = await getDocs(BookCollection);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));
        setBook(getData);
        setCurrentBooks(getData);
        console.log("Kitoblar yuklandi");
      } catch (error) { }
    }
  };


  getBooks();
  getCategories();



  return (
    <LibraryRoot className="root">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>

        {/* HOME PAGE */}
        <Route
          path={"/"}
          element={<Home
            FilerCategories={FilerCategories}
            categories={categories}
            setCategories={setCategories}
            setCurrentBooks={setCurrentBooks}
            books={books}
            setBook={setBook}
          />}
        />

        {/* Book Info Page */}
        <Route
          path="/book/:id"
          element={<Book CurrentBooks={CurrentBooks} />}
        />

        {/* Login page (with route) */}

        <Route
          path={"/login"}
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        {/* Not Found Page */}

        <Route path={"*"} element={<NotFound />} />
        {NavbarMock.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
      </Routes>
    </LibraryRoot>
  );
};
export default Root;
