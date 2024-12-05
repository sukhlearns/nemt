import * as React from 'react';
import { Grid, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const sampleReportData = [
  { id: 'C001', name: 'John Doe', phone: '123-456-7890', scheduledDate: '2024-12-10 10:00 AM', status: 'Completed' },
  { id: 'C002', name: 'Jane Smith', phone: '987-654-3210', scheduledDate: '2024-12-12 02:00 PM', status: 'Dispatched' },
  { id: 'C003', name: 'Alice Johnson', phone: '555-123-4567', scheduledDate: '2024-12-14 01:00 PM', status: 'Pending' },
  { id: 'C004', name: 'Bob Brown', phone: '333-444-5555', scheduledDate: '2024-12-15 11:30 AM', status: 'Completed' },
  // Add more sample data as needed
];

export default function ReportPage() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [statusFilter, setStatusFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(sampleReportData);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterData = () => {
    const filtered = sampleReportData.filter((data) => {
      const dateInRange =
        (!startDate || new Date(data.scheduledDate) >= new Date(startDate)) &&
        (!endDate || new Date(data.scheduledDate) <= new Date(endDate));

      const statusMatch = !statusFilter || data.status === statusFilter;

      return dateInRange && statusMatch;
    });
    setFilteredData(filtered);
  };

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Ride Report
      </Typography>

      {/* Report Filters */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filter Report
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              value={startDate}
              onChange={handleStartDateChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              value={endDate}
              onChange={handleEndDateChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={statusFilter}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Dispatched">Dispatched</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={filterData}>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Table */}
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
            {filteredData.map((data) => (
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
