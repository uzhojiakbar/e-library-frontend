import React, { useRef, useState } from "react";
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

const CategoryAdmin = ({ categories, notify }) => {
  const [ctgs, setctgs] = useState(categories);

  const ctgNameRef = useRef("");

  const getCategories = async (update = 0) => {
    if (categories.length === 0 || update === 1) {
      try {
        await fetch("http://localhost:4000/categories")
          .then((response) => response.json())
          .then((result) => {
            setctgs(result.sort((a, b) => {
              if (a.id === "bottom") return 1;
              return a.id - b.id;
            }));
          })
          .catch((error) => console.error("Xatolik:", error));
      } catch (error) { }
    }
  };

  const AddCtg = async () => {
    try {
      await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ctgNameRef.current.value,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          getCategories(1);
          notify("ok", "Kategoriya qoshildi!");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      notify("err", "Qandaydur xatolik!");
    }
  };


  const DelCtg = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        notify("err", "Server Xatosi!");
        throw new Error("Server xatosi");
      }
      getCategories(1);
      notify("ok", "Kategoriya o'chirildi!");
    } catch (error) {
      console.error(error.message);
      notify("err", "Kitob Ochirilmadi!");
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
                  <TableCell>Kategoriya</TableCell>
                  <TableCell onClick={() => DelCtg(v.id)}>
                    <i
                      className="cursor-pointer hover:bg-black hover:text-[white] p-2  text-center fa-solid fa-trash"
                      style={{ borderRadius: "50%" }}
                    ></i>
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
