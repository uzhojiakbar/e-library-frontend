import React, { useRef } from "react";
import { AdminContainer } from "./style";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useMediaQuery } from "@uidotdev/usehooks";
import toast, { Toaster } from "react-hot-toast";

const Admin = ({ categories, setCategories, FilerCategories }) => {
  const ctgNameRef = useRef("");
  const ctgDelRef = useRef("");

  const notify = (type = "ok", text) => {
    if (type === "ok") {
      toast.success(text || "Tayyor");
    } else if (type === "err") {
      toast.error(text || "Xato");
    } else if (type === "wait") {
      toast.loading(text || "Kuting...");
    }
  };

  FilerCategories(1);

  const AddCtg = async () => {
    try {
      await FilerCategories(1);
      const CollenctionRef = collection(db, "category");
      await addDoc(CollenctionRef, {
        auth: "admin",
        count: 0,
        idForFilter: categories[categories.length - 2].idForFilter + 1,
        name: ctgNameRef.current.value,
      });
      notify("ok", "Kategoriya qoshildi!");
    } catch (error) {
      notify("err", "Qandaydur xatolik!");
    }
  };
  const DelCtg = async () => {
    try {
      await deleteDoc(doc(db, "category", ctgDelRef.current.value));
      notify("ok", "Kategoriya o'chirildi!");
    } catch (error) {
      notify("err", "Qandaydur xatolik!");
    }
  };

  const IsMobile = useMediaQuery("(max-width : 605px)");

  return (
    <>
      <AdminContainer>
        <h1 className="text-[40px]">Admin, Xush kelibsiz</h1>
        <div
          className={`flex 
        ${IsMobile ? "flex-col max-w-[100vw] w-[90vw]" : "flex-row"} 
         max-w-[100vw]  border-red-600 gap-[30px]`}
        >
          <div className="flex flex-col gap-[20px] flex-1">
            <h1 className="text-[20px]">Kategoriyalar: {categories.length}</h1>
            <div
              className="p-[10px] flex flex-col gap-[5px] w-[100%] bg-white  border-black max-h-[300px] h-[fit] overflow-auto"
              name=""
              id=""
            >
              {categories.map((v) => {
                return (
                  <div
                    className="p-[10px] flex justify-between text-center gap-[20px] border-black cursor-pointer text-black hover:bg-gray-900 hover:text-white "
                    key={v.id}
                  >
                    <p className="w-[35%]">{v.name}</p>
                    <p className="text-gray-500 w-[40%]">{v.id}</p>
                    <p className="text-gray-500 w-[25%]">{v.count}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[40px] flex-1">
            <h1 className="text-[20px]">Kategoriya boyicha amallar</h1>
            <div className="flex gap-[10px]">
              <Input
                ref={ctgNameRef}
                className="w-[500px] text-[20px] border-black bg-white border-none"
                type="text"
                placeholder="Kategoriya qo'shish (nomini kiriting)"
              />
              <Button
                onClick={() => AddCtg()}
                className="text-[20] button"
                type="submit"
              >
                Kategoriya qoshish
              </Button>
            </div>
            <div className="flex gap-[10px]">
              <Input
                ref={ctgDelRef}
                className="w-[500px] text-[20px] border-black bg-white border-none"
                type="text"
                placeholder="Kategoriya qo'shish (nomini kiriting)"
              />
              <Button
                onClick={() => DelCtg()}
                className="text-[20] button"
                type="submit"
              >
                Kategoriya o'chirish
              </Button>
            </div>
            <Button
              onClick={() => console.log("hi")}
              className="text-[20] button"
              type="submit"
            >
              Barcha kategoriyalarni ochirish
            </Button>
          </div>
        </div>
      </AdminContainer>
      <Toaster />
    </>
  );
};

export default Admin;
