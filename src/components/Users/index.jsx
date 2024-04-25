import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

import * as XLSX from "xlsx";


const Users = ({ users }) => {
    console.log(users);

    // "user"
    // {
    //     "id": "4yPDrxzJolPO9cPwVNBS",
    //     "email": "uzhojiakbar3@gmail.com",
    //     "date": "undefined",
    //     "type": "user",
    //     "coins": 100,
    //     "pass": "undefined",
    //     "name": "Hojiakbar Murodillayev"
    // }

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



    return (
        <div>
            <div className="flex flex-col gap-[20px]">
                <div className="flex justify-between">
                    <h1 className="text-[20px]">Foydaluvchilar: {users.length}</h1>
                    <h1 className="text-[20px]" onClick={exportXlsx}>
                        Export
                    </h1>
                </div>
                {/* <DataGrid
                    rows={users}
                    columns={columns}
                    sx={"background-color: #ffffffb4; font-size: 16px;"}
                    style={{
                        zIndex: 0
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    checkboxSelection
                /> */}
            </div>
        </div>
    )
}

export default Users