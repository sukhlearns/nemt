import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ChartUserByCountry from './ChartUserByCountry';
import PageViewsBarChart from './PageViewsBarChart';
import WorldMap from './WorldMap';

const dataCards = [
  { title: 'Users', value: '14k', description: 'Active users in the last 30 days' },
  { title: 'Monthly Event', value: '325', description: 'Successful new register Event this month' },
  { title: 'Events', value: '200k', description: 'Total events tracked this month' },
];

const samplePatients = [
  { id: 'P001', name: 'John Doe', phone: '123-456-7890', address: '123 Main St, Springfield' },
  { id: 'P002', name: 'Jane Smith', phone: '987-654-3210', address: '456 Elm St, Shelbyville' },
  { id: 'P003', name: 'Alice Johnson', phone: '555-123-4567', address: '789 Oak St, Capital City' },
  { id: 'P004', name: 'Bob Brown', phone: '333-444-5555', address: '101 Pine St, Ogdenville' },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = samplePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt:3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={0} sx={{ mt: 3,display:'flex',gap:3,flexWrap:"nowrap", width:'100%' }}>
        {dataCards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {card.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Map */}
      <Grid container spacing={0} sx={{ mt: 3,display:'flex', flexWrap:"nowrap" }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', mr:1 }}>
            <PageViewsBarChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', ml:2 }}>
            <ChartUserByCountry />
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <WorldMap />
          </Paper>
      </Grid>

      {/* Search Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{mb:2}}>Search Patients</Typography>
        <Grid container spacing={0} sx={{gap:3}}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name, Patient ID, or Phone Number"
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

      {/* Patient Data Table */}
      <TableContainer component={Paper} elevation={3} sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
