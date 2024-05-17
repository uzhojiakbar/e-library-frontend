import React, { useState } from "react";
import { LibraryRoot } from "./style";
import "./style.css";
import Navbar from "../components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Book from "../components/Book";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import FileUpload from "../Pages/FIleUpload";
import ToplamView from "src/components/ToplamView";
import Admin from "src/Pages/Rolls/Admin";
import AdminRoute from "src/components/AdminRoute";
import CategoryAdmin from "src/components/CategoryAdmin";
import toast from "react-hot-toast";
import Nazoratchi from "src/Pages/Rolls/Nazoratchi";
import ToplamAdmin from "src/components/ToplamAdmin";
import Users from "src/components/Users";

const Root = () => {
  const [isLogin, setIsLogin] = [localStorage.getItem("login")];

  const [categories, setCategories] = useState([]);

  const [CurrentBooks, setCurrentBooks] = useState("");
  const [books, setBook] = useState([]);
  const [toplam, setToplam] = useState([]);
  const [users, setUsers] = useState([]);

  const FilerCategories = (filter) => {
    if (filter) {
      const sortedCategories = categories;
      setCategories(sortedCategories);
    }
  };

  const getCategories = async (update = 0) => {
    if (categories.length === 0 || update === 1) {
      try {
        try {
          await fetch("http://localhost:4000/categories")
            .then((response) => response.json())
            .then((result) => {
              setCategories(
                result.sort((a, b) => {
                  if (a.id === "bottom") return 1;
                  return a.id - b.id;
                })
              );
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
        await fetch("http://localhost:4000/books")
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
        await fetch("http://localhost:4000/toplam")
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

  const notify = (type = "ok", text) => {
    if (type === "ok") {
      toast.success(text || "Tayyor");
    } else if (type === "err") {
      toast.error(text || "Xato");
    } else if (type === "wait") {
      toast.loading(text || "Kuting...");
    }
  };

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

        <Route
          path="/admin"
          element={
            JSON.parse(localStorage.getItem("user"))?.type === "admin" ? (
              <Admin />
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          <Route
            path="ctg"
            element={
              <AdminRoute>
                <CategoryAdmin categories={categories} notify={notify} />
              </AdminRoute>
            }
          />
          <Route
            path="user"
            element={
              <AdminRoute>
                <Users users={users} setUsers={setUsers} />
              </AdminRoute>
            }
          />

          <Route
            path="kafedra"
            element={
              <AdminRoute>
                <ToplamAdmin toplam={toplam} notify={notify} books={books} />
              </AdminRoute>
            }
          />

          <Route
            path="book"
            element={
              <AdminRoute>
                <Nazoratchi books={books} />
              </AdminRoute>
            }
          />
        </Route>

        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </LibraryRoot>
  );
};
export default Root;
