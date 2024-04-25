// import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import * as XLSX from "xlsx";

const Users = ({ users }) => {
  const exportXlsx = () => {
    console.log("export");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);

    XLSX.utils.book_append_sheet(wb, ws, "Foydaluvchilar royxati");

    XLSX.writeFile(wb, "Foydalanuvchilar_ochiq_baza.xlsx");
  };

  const columns = [
    { field: "id", headerName: "ID", width: "200" },
    { field: "name", headerName: "FIO", width: "200" },
    { field: "email", headerName: "Email", width: "200" },
    { field: "pass", headerName: "Parol", width: "200" },
    { field: "type", headerName: "status", width: "200" },
  ];
  let edit = false;

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <h1 className="text-[20px]">Foydaluvchilar: {users.length}</h1>
          <h1 className="text-[20px]" onClick={exportXlsx}>
            Export
          </h1>
        </div>
        <TableContainer
          className="max-h-[500px] max-w-[1000px] overflow-scroll"
          component={Paper}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((v) => {
                  return <TableCell key={v.id}>{v.headerName}</TableCell>;
                })}
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((v, i) => {
                return (
                  <TableRow
                    key={v.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{v.id ? v.id : "NULL_RELOAD"}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.email}</TableCell>
                    <TableCell>
                      {v.pass.length > 9 ? v.pass.slice(26) : "Google orqali"}
                    </TableCell>
                    <TableCell>{v.type}</TableCell>
                    <TableCell>...edit</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Users;
