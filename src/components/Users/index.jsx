import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Users = ({ users }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (userId, newStatus) => {
    // Update user status in Firebase
    // For demonstration purposes, we'll just log the changes
    console.log(`User ${userId} status updated to ${newStatus}`);

    // Find the user in the users array and update their status
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, type: newStatus } : user
    );

    // Update the users state with the updated users array
    // setUsers(updatedUsers);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Foydaluvchilar royxati");

    // Ustunlar
    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "FIO", key: "name" },
      { header: "Email", key: "email" },
      { header: "Parol", key: "pass" },
      { header: "Status", key: "type" },
    ];

    worksheet.getRow(1).font = { bold: true };

    // Ma'lumotlar
    users.forEach((user) => {
      worksheet.addRow({
        id: user.id,
        name: user.name,
        email: user.email,
        pass: user.pass,
        type: user.type,
      });
    });

    // Autosize columns
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        maxLength = Math.max(
          maxLength,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    // Autosize rows
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      const textLength = cell.value ? cell.value.toString().length : 0;
      if (textLength > 0) {
        worksheet.getRow(1).height =
          Math.max(worksheet.getRow(1).height || 0, Math.ceil(textLength / 10) * 15);
      }
    });

    // Faylni saqlash va yuklash
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "Foydalanuvchilar_ochiq_baza.xlsx");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "FIO", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "pass", headerName: "Parol", width: 200 },
    { field: "type", headerName: "status", width: 200 },
    { field: "", headerName: "", width: 0 }, // Bu qatorni ko'rsatmaydi
  ];

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <h1 className="text-[20px]">Foydaluvchilar: {users.length}</h1>
          <h1 className="text-[20px]" onClick={exportToExcel}>
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
                  return <TableCell key={v.field}>{v.headerName}</TableCell>;
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
                    <TableCell>
                      <Select
                        value={v.type}
                        onChange={(e) => handleStatusChange(v.id, e.target.value)}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                      </Select>
                    </TableCell>
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
