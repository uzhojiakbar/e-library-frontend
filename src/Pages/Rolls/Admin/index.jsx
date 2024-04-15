import React from "react";
import { AdminContainer } from "./style";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const Admin = ({ categories, setCategories, FilerCategories }) => {


  return (
    <AdminContainer>
      <h1 className="text-[40px]">Admin, Xush kelibsiz</h1>
      <div className="flex gap-[50px]">
        <h1 className="text-[20px]">Kategoriyalar: {categories.length}</h1>
        <select name="" id="">
          {categories.map((v) => {
            return <option key={v.id}>{v.name}</option>;
          })}
        </select>
        <div className="flex gap-[10px]">
          <Input className="w-[500px] text-[20px] border-black " type="email" placeholder="Nom kiriting..." />
          <Button type="submit">Kategoriya qoshish</Button>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Admin;
