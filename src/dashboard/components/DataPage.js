import * as React from 'react';
import { Grid, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const sampleData = [
  { id: 'C001', name: 'John Doe', phone: '123-456-7890' },
  { id: 'C002', name: 'Jane Smith', phone: '987-654-3210' },
  { id: 'C003', name: 'Alice Johnson', phone: '555-123-4567' },
  { id: 'C004', name: 'Bob Brown', phone: '333-444-5555' },
  // Add more sample data as needed
];

export default function DataPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = sampleData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phone.includes(searchTerm) ||
      data.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Data Page
      </Typography>

      {/* Search Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Search Data
        </Typography>
        <Grid container spacing={0} sx={{ gap: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name, Client Code, or Phone Number"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button fullWidth variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={3} sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
