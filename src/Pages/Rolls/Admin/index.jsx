import React, { useState } from "react";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { AdminContainer } from "./style";
import CategoryAdmin from "src/components/CategoryAdmin";
import ToplamAdmin from "src/components/ToplamAdmin";

const Admin = ({
  categories,
  books,
  setCategories,
  FilerCategories,
  users,
}) => {
  const [page, setPage] = useState("admin");

  FilerCategories(1);

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

  const notify = (type = "ok", text) => {
    if (type === "ok") {
      toast.success(text || "Tayyor");
    } else if (type === "err") {
      toast.error(text || "Xato");
    } else if (type === "wait") {
      toast.loading(text || "Kuting...");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: "200" },
    { field: "name", headerName: "FIO", width: "200" },
    { field: "email", headerName: "Email", width: "200" },
    { field: "pass", headerName: "Parol", width: "200" },
    { field: "type", headerName: "status", width: "200" },
  ];
  return (
    <>
      <AdminContainer>
        <div className="nav">
          <div className="items">
            {nav.map((v) => {
              return (
                <p
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
          <CategoryAdmin
            categories={categories}
            FilerCategories={FilerCategories}
            notify={notify}
          />
        ) : (
          ""
        )}
        {page === "user" ? (
          <div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex justify-between">
                <h1 className="text-[20px]">Foydaluvchilar: {users.length}</h1>
                <h1 className="text-[20px]" onClick={exportXlsx}>
                  Export
                </h1>
              </div>
              <DataGrid
                rows={users}
                columns={columns}
                sx={"background-color: #ffffffb4; font-size: 16px;"}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {page === "toplam" ? <ToplamAdmin books={books} /> : ""}
      </AdminContainer>
      <Toaster />
    </>
  );
};

export default Admin;
