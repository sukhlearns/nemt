import * as React from 'react';
import { Grid, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const sampleData = [
  { id: 'C001', name: 'John Doe', phone: '123-456-7890', scheduledDate: '2024-12-10 10:00 AM' },
  { id: 'C002', name: 'Jane Smith', phone: '987-654-3210', scheduledDate: '2024-12-12 02:00 PM' },
  { id: 'C003', name: 'Alice Johnson', phone: '555-123-4567', scheduledDate: '2024-12-14 01:00 PM' },
  { id: 'C004', name: 'Bob Brown', phone: '333-444-5555', scheduledDate: '2024-12-15 11:30 AM' },
  // Add more sample data as needed
];

export default function DispatchPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedClient, setSelectedClient] = React.useState('');
  const [scheduledData, setScheduledData] = React.useState(sampleData);
  const [dispatchStatus, setDispatchStatus] = React.useState('Pending');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleDispatch = () => {
    const newDispatch = {
      id: `C00${scheduledData.length + 1}`,
      name: selectedClient,
      phone: '555-000-0000',
      scheduledDate: selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm A') : '',
      status: dispatchStatus,
    };
    setScheduledData([...scheduledData, newDispatch]);
  };

  const filteredData = scheduledData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phone.includes(searchTerm) ||
      data.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Dispatch Ride
      </Typography>

      {/* Dispatching Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dispatch a Ride
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Client"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="client-select-label">Select Client</InputLabel>
              <Select
                labelId="client-select-label"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                label="Select Client"
              >
                {filteredData.map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date and Time"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Dispatch Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={dispatchStatus}
                onChange={(e) => setDispatchStatus(e.target.value)}
                label="Dispatch Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Dispatched">Dispatched</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button  variant="contained" color="primary" onClick={handleDispatch}>
              Dispatch Ride
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Dispatched Rides Table */}
      <TableContainer component={Paper} elevation={3} sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.scheduledDate}</TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
