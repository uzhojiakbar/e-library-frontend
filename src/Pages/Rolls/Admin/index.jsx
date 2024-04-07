import React from "react";
import { AdminContainer } from "./style";

const Admin = ({ categories, setCategories, FilerCategories }) => {
  return (
    <AdminContainer>
      <h1>Admin, Xush kelibsiz</h1>
      <div>
        <h1>Categories</h1>
        {categories.map((v) => {
          return <p key={v.id}>{v?.name}</p>;
        })}
        <button onClick={FilerCategories}>Qoshish</button>
      </div>
    </AdminContainer>
  );
};

export default Admin;
