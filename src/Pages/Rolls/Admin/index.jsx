import React, { useRef, useState } from "react";
import { AdminContainer } from "./style";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";

const Admin = ({ categories, setCategories, FilerCategories, users }) => {
  const ctgNameRef = useRef("");

  const [page, setPage] = useState("admin");
  const [ctgs, setctgs] = useState(categories);

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
      setctgs([
        ...ctgs,
        {
          auth: "admin",
          count: 0,
          idForFilter: categories[categories.length - 2].idForFilter + 1,
          name: ctgNameRef.current.value,
        },
      ]);
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
  const DelCtg = async (id) => {
    try {
      await deleteDoc(doc(db, "category", id));
      let res = ctgs.filter((v) => (v.id !== id ? v : ""));
      setctgs(res);
      notify("ok", "Kategoriya o'chirildi!");
    } catch (error) {
      notify("err", "Qandaydur xatolik!");
    }
  };

  const nav = [
    { id: 1, page: "ctg", name: "Kategoriya sozlamari" },
    { id: 2, page: "user", name: "Foydaluvchilar" },
    { id: 3, page: "toplam", name: "Toplamlar" },
  ];

  const exportXlsx = () => {
    console.log("export");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);

    XLSX.utils.book_append_sheet(wb, ws, "Foydaluvchilar royxati");

    XLSX.writeFile(wb, "Foydalanuvchilar_ochiq_baza.xlsx");
  };

  return (
    <>
      <AdminContainer>
        <div className="nav">
          <div className="items">
            {nav.map((v) => {
              return (
                <p
                  onClick={() => setPage(v.page)}
                  className={`child ${page === v.page ? "active" : ""}`}
                >
                  {v.name}
                </p>
              );
            })}
          </div>
        </div>
        <h1 className="text-[40px]">Admin, Xush kelibsiz</h1>
        {page === "admin" ? <h1>Home</h1> : ""}
        {page === "ctg" ? (
          <div
            className={`w-[100%] max-w-[100vw] flex flex-col gap-[40px] border-red-600 gap-[30px]`}
          >
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
            </div>
            <div className="main">
              <div className="row rowtitle">
                <div className="leftfixed ">ID raqam</div>
                <div>Nomi</div>
                <div>Soni</div>
                <p className="">Turi</p>
                <div className="rightfixed">Boshqarish</div>
              </div>
              {ctgs.map((v) => {
                return (
                  <div className="ctgs row p-[18px]" key={v.id}>
                    <p className="leftfixed">{v.id ? v.id : "NULL_RELOAD"}</p>
                    <b className="">{v.name}</b>
                    <p className="">{v.count}</p>
                    <p className="">Kategoriya</p>
                    <p
                      onClick={() => DelCtg(v.id)}
                      className="rightfixed fa-solid fa-trash"
                    ></p>
                    {/* <p onClick={() => DelCtg(v.id)} className="desc w-[25%] fa-solid fa-trash"></p> */}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {page === "user" ? (
          <div
            className={`w-[100%] max-w-[100vw] flex flex-col  border-red-600 gap-[30px]`}
          >
            <div className="flex flex-col gap-[20px] w-[100%]">
              <div>
                <h1 className="text-[20px]">Foydaluvchilar: {users.length}</h1>
                <h1 className="text-[20px]" onClick={exportXlsx}>
                  Export
                </h1>
              </div>

              <div className="main" name="" id="">
                <div className="row rowtitle">
                  <div className="leftfixed ">ID raqam</div>
                  <div>F.I.O</div>
                  <div>Email</div>
                  <div>parol</div>
                  <div className="rightfixed">STATUS</div>
                </div>
                {users.map((v) => {
                  return (
                    <div className="ctgs row p-[18px]" key={v.id}>
                      <p className=" leftfixed">
                        {v.id ? v.id : "NULL_RELOAD"}
                      </p>
                      <b className="flex-2">{v.name}</b>
                      <p className="">{v.email}</p>
                      <p className="">
                        {v.pass === "undefined"
                          ? "Google orqali"
                          : v.pass.slice(26, v.pass.length)}
                      </p>
                      <p className="rightfixed">{v.type}</p>
                      {/* <p onClick={() => DelCtg(v.id)} className="desc w-[25%] fa-solid fa-trash"></p> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </AdminContainer>
      <Toaster />
    </>
  );
};

export default Admin;
