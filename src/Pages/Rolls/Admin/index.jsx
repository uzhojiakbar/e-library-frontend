import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AdminContainer } from "./style";
import CategoryAdmin from "src/components/CategoryAdmin";
import ToplamAdmin from "src/components/ToplamAdmin";
import Users from "src/components/Users";
import Nazoratchi from "../Nazoratchi";

const Admin = ({ categories, books, setCategories, users, toplam }) => {
  const [page, setPage] = useState("admin");

  const nav = [
    { id: 1, page: "ctg", name: "Kategoriya sozlamari" },
    { id: 2, page: "user", name: "Foydaluvchilar" },
    { id: 3, page: "toplam", name: "Kafedralar" },
    { id: 4, page: "kitob", name: "Kitoblar" },
  ];

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
    <>
      <AdminContainer>
        <div className="nav z-[1]">
          <div className="items  ">
            {nav.map((v) => {
              return (
                <p
                  key={v.id}
                  onClick={() => setPage(v.page)}
                  className={` ${page === v.page ? "child active" : "child"}`}
                >
                  {v.name}
                </p>
              );
            })}
          </div>
        </div>
        {page === "admin" ? <h1>Home</h1> : ""}
        {page === "ctg" ? (
          <CategoryAdmin categories={categories} notify={notify} />
        ) : (
          ""
        )}
        {page === "user" ? <Users users={users} /> : ""}

        {page === "kitoblar" ? (
          <ToplamAdmin notify={notify} books={books} />
        ) : (
          ""
        )}
        {page === "kitob" ? <Nazoratchi books={books} /> : ""}
      </AdminContainer>
      {page === "toplam" ? (
        <ToplamAdmin toplam={toplam} notify={notify} books={books} />
      ) : (
        ""
      )}
      <Toaster />
    </>
  );
};

export default Admin;
