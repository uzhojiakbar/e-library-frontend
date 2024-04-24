import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "src/config/firebase";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CategoryAdmin = ({ categories, FilerCategories, notify }) => {
  const [ctgs, setctgs] = useState(categories);

  const ctgNameRef = useRef("");

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

  return (
    <div
      className={`w-[100%] max-w-[100vw] flex flex-col  border-red-600 gap-[30px]`}
    >
      <div className="flex flex-col gap-[40px] flex-1">
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
      {/* <div className="main"> */}
      <TableContainer
        className="max-h-[500px] max-w-[1000px] overflow-scroll"
        component={Paper}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID raqam</TableCell>
              <TableCell>Nomi</TableCell>
              <TableCell>Soni</TableCell>
              <TableCell>Turi</TableCell>
              <TableCell>Boshqarish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ctgs.map((v) => {
              return (
                <TableRow
                  key={v.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{v.id ? v.id : "NULL_RELOAD"}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.count}</TableCell>
                  <TableCell>Kategoriya</TableCell>
                  <TableCell onClick={() => DelCtg(v.id)}>
                    <i className="cursor-pointer text-center fa-solid fa-trash"></i>
                  </TableCell>
                  {/* <p onClick={() => DelCtg(v.id)} className="desc w-[25%] fa-solid fa-trash"></p> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* </div> */}
    </div>
  );
};

export default CategoryAdmin;
