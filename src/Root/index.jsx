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
import ToplamView from "src/components/ToplamView";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];

  const [categories, setCategories] = useState([]);

  const [CurrentBooks, setCurrentBooks] = useState("");
  const [books, setBook] = useState([]);
  const [toplam, setToplam] = useState([]);
  const [users, setUsers] = useState([]);

  const FilerCategories = (filter) => {
    if (filter) {
      const data = categories.sort((a, b) => a.id - b.id);
      setCategories(data);
    }
  };

  const getCategories = async (update = 0) => {
    if (categories.length === 0 || update === 1) {
      try {
        try {
          await fetch("http://localhost:3000/categories")
            .then((response) => response.json())
            .then((result) => {
              setCategories(result);
            })
            .catch((error) => console.error("Xatolik:", error));
        } catch (error) {}
      } catch (error) {
        console.error(error);
        console.log("Categoriya yuklanmadi!");
      }
    }
  };

  const getBooks = async () => {
    if (books.length === 0) {
      try {
        await fetch("http://localhost:3000/books")
          .then((response) => response.json())
          .then((result) => {
            setBook(result);
            setCurrentBooks(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };

  const getToplam = async () => {
    if (toplam.length === 0) {
      try {
        await fetch("http://localhost:3000/toplam")
          .then((response) => response.json())
          .then((result) => {
            setToplam(result);
            console.log(result);
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) {}
    }
  };
  const getUsers = async () => {
    if (users.length === 0) {
      try {
        const UserCollection = collection(db, "users");
        const data = await getDocs(UserCollection);
        const getData = data.docs.map((v) => ({ id: v.id, ...v.data() }));
        setUsers(getData);
      } catch (error) {}
    }
  };

  getBooks();
  getToplam();
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
              toplam={toplam}
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
          path="/book/:idB"
          element={
            <Book books={books} setBook={setBook} CurrentBooks={CurrentBooks} />
          }
        />

        {/*  */}
        <Route
          path="/toplam/:toplamId"
          element={<ToplamView toplam={toplam} books={books} />}
        />
        {/*  */}
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
