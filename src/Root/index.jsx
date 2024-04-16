import React, { useState } from "react";
import { LibraryRoot } from "./style";
import "./style.css";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Book from "../components/Book";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import FileUpload from "../Pages/FIleUpload";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];

  const [categories, setCategories] = useState([]);

  const [CurrentBooks, setCurrentBooks] = useState("");
  const [books, setBook] = useState([]);
  const [users, setUsers] = useState([]);

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
  const getUsers = async () => {
    if (books.length === 0) {
      try {
        const UserCollection = collection(db, "users");
        const data = await getDocs(UserCollection);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));
        setUsers(getData);
        console.log(getData);
        console.log("Foydaluvchilar yuklandi");
      } catch (error) { }
    }
  };

  getBooks();
  getUsers();
  getCategories();

  return (
    <LibraryRoot className="root">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        {/* HOME PAGE */}
        <Route
          path={"/"}
          element={
            <Home
              FilerCategories={FilerCategories}
              categories={categories}
              setCategories={setCategories}
              setCurrentBooks={setCurrentBooks}
              getCategories={getCategories}
              books={books}
              users={users}
              setBook={setBook}
            />
          }
        />

        {/* Book Info Page */}
        <Route
          path="/book/:id"
          element={
            <Book books={books} setBook={setBook} CurrentBooks={CurrentBooks} />
          }
        />
        <Route
          path="/search/:q"
          element={
            <Home
              FilerCategories={FilerCategories}
              categories={categories}
              setCategories={setCategories}
              setCurrentBooks={setCurrentBooks}
              books={books}
              setBook={setBook}
            />
          }
        />

        {/* Login page (with route) */}

        <Route
          path={"/login"}
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />

        {/* Not Found Page */}

        <Route
          path={"/file-upload"}
          element={
            <FileUpload
              FilerCategories={FilerCategories}
              categories={categories}
            />
          }
        />

        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </LibraryRoot>
  );
};
export default Root;
