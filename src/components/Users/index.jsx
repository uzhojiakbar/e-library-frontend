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
  Button,
} from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { CheckCheck, UserRoundCog } from "lucide-react";

const Users = ({ users, setUsers }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserStatus, setEditUserStatus] = useState("");

  const handleStatusChange = (userId, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, type: newStatus } : user
    );
    setUsers(updatedUsers);
    console.log(`User ${userId} status updated to ${newStatus}`);
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setEditUserId(userId);
      setEditUserName(user.name);
      setEditUserStatus(user.type);
      console.log(editUserId);
    }
  };

  const saveEditedUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUserId
        ? { ...user, name: editUserName, type: editUserStatus }
        : user
    );
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditUserName("");
    setEditUserStatus("");
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Foydalanuvchilar ro'yxati");

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
        worksheet.getRow(1).height = Math.max(
          worksheet.getRow(1).height || 0,
          Math.ceil(textLength / 10) * 15
        );
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
    { field: "edit", headerName: "tahrirlash", width: 200 },
  ];

  const validStatuses = [
    {
      id: 1,
      name: "Foydaluvchi",
      key: "user",
    },
    {
      id: 2,
      name: "Admin",
      key: "admin",
    },
    {
      id: 3,
      name: "Kafedra",
      key: "kafedra",
    },
    {
      id: 4,
      name: "nazoratchi",
      key: "nazoratchi",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <h1 className="text-[20px]">Foydalanuvchilar: {users.length}</h1>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length ? (
                users.map((v, i) => (
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
                      {editUserId === v.id ? (
                        <Select
                          value={v.type || "nomalum"}
                          onChange={(e) =>
                            handleStatusChange(v.id, e.target.value)
                          }
                          style={{ minWidth: 100 }}
                          variant="outlined"
                          size="small"
                        >
                          {validStatuses.map((status) => (
                            <MenuItem key={status.id} value={status.key}>
                              {status.name}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        v.type
                      )}
                    </TableCell>
                    <TableCell>
                      {editUserId === v.id ? (
                        <Button onClick={() => saveEditedUser(v.id)}>
                          <CheckCheck size={16} />
                        </Button>
                      ) : (
                        <Button onClick={() => handleEditUser(v.id)}>
                          <UserRoundCog size={16} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    <div className="loaderWindow">
                      <div className="loader"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Users;
