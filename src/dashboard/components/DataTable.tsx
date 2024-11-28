import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Date', headerName: 'Date', width: 130 },
  { field: 'From-to-Time', headerName: 'From-to Time', width: 130 },
  { field: 'Patient', headerName: 'Patient', width: 130 },
  { field: 'Pickup-Address', headerName: 'Pickup Address', width: 130 },
  { field: 'Drop-off', headerName: 'First name', width: 130 },
  { field: 'Date', headerName: 'Date', width: 130 },
  { field: 'From-to-Time', headerName: 'From-to Time', width: 130 },
  { field: 'Patient', headerName: 'Patient', width: 130 },
  { field: 'Pickup-Address', headerName: 'Pickup Address', width: 130 },
  { field: 'Drop-off', headerName: 'First name', width: 130 },
  { field: 'Patient', headerName: 'Patient', width: 130 },
  { field: 'Pickup-Address', headerName: 'Pickup Address', width: 130 },
  { field: 'Drop-off', headerName: 'First name', width: 130 },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}