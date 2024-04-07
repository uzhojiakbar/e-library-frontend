import React, { useState } from "react";
import { AdminContainer } from "./style";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const Admin = () => {
  const [categories, setCategories] = useState([]);

  // const CreateCategory = async (ctg) => {
  //   const CollenctionRef = collection(db, "category");
  //   await addDoc(CollenctionRef, ctg);
  //   await console.log(ctg.name, " qoshildi bazaga qoshildi...");
  // };

  const FilerCategories = () => {
    if (categories.length !== 0) {
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
        FilerCategories();
        console.log("Categoriya filterlandi!");
      } catch (error) {
        console.error(error);
        console.log("Categoriya yuklanmadi!");
      }
    }
  };

  getCategories();

  // const ctgAdd = async () => {
  //   await CreateCategory({
  //     idForFilter: "",
  //     name: "i.name",
  //     count: "0",
  //     auth: "Admin",
  //   });
  //   await console.log("i.name", "Qoshildi");
  //   await getCategories(1);
  // };

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
