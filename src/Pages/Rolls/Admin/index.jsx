import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminContainer } from "./style";

const Admin = () => {
  const nav = [
    { id: 1, page: "ctg", name: "Kategoriya sozlamari" },
    { id: 2, page: "user", name: "Foydaluvchilar" },
    { id: 3, page: "kafedra", name: "Kafedralar" },
    { id: 4, page: "book", name: "Kitoblar" },
  ];

  return (
    <AdminContainer>
      <div className="nav z-[1]">
        <div className="items">
          {nav.map((v) => (
            <NavLink
              key={v.id}
              to={`/admin/${v.page}`}
              className={({ isActive }) =>
                isActive ? "child active" : "child"
              }
            >
              {v.name}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
      <Toaster />
    </AdminContainer>
  );
};

export default Admin;
