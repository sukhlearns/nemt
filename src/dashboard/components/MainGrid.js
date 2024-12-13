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

import WorldMap from './WorldMap';

const dataCards = [
  { title: 'Users', value: '14k', description: 'Active users in the last 30 days' },
  { title: 'Monthly Event', value: '325', description: 'Successful new register Event this month' },
  { title: 'Events', value: '200k', description: 'Total events tracked this month' },
];

const samplePatients = [
  { id: 'P001', name: 'John Doe', phone: '123-456-7890', address: '123 Main St, Springfield', location: { lat: 37.7749, lng: -122.4194 }, driver: { name: 'Driver 1', location: { lat: 37.8044, lng: -122.2711 }, eta: 10 }},
  { id: 'P002', name: 'Jane Smith', phone: '987-654-3210', address: '456 Elm St, Shelbyville', location: { lat: 38.7749, lng: -123.4194 }, driver: { name: 'Driver 2', location: { lat: 38.8044, lng: -123.2711 }, eta: 15 }},
  { id: 'P003', name: 'Alice Johnson', phone: '555-123-4567', address: '789 Oak St, Capital City', location: { lat: 39.7749, lng: -124.4194 }, driver: { name: 'Driver 3', location: { lat: 39.8044, lng: -124.2711 }, eta: 20 }},
  { id: 'P004', name: 'Bob Brown', phone: '333-444-5555', address: '101 Pine St, Ogdenville', location: { lat: 40.7749, lng: -125.4194 }, driver: { name: 'Driver 4', location: { lat: 40.8044, lng: -125.2711 }, eta: 30 }},
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = samplePatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={0} sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: 'nowrap', width: '100%' }}>
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

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <WorldMap patient={selectedPatient} driver={selectedPatient?.driver} />
        </Paper>
      </Grid>

      {/* Selected Patient and Driver Details with ETA */}
      {selectedPatient && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Selected Patient & Driver Details
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Patient Name:</strong> {selectedPatient.name}
            </Typography>
            <Typography variant="body1">
              <strong>Patient ID:</strong> {selectedPatient.id}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {selectedPatient.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {selectedPatient.address}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Driver:</strong> {selectedPatient.driver.name}
            </Typography>
            <Typography variant="body1">
              <strong>ETA:</strong> {selectedPatient.driver.eta} minutes
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Search Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Search Patients
        </Typography>
        <Grid container spacing={0} sx={{ gap: 3 }}>
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
              <TableRow
                key={patient.id}
                onClick={() => handleSelectPatient(patient)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedPatient?.id === patient.id ? '#f0f0f0' : 'transparent', // Highlight selected row
                }}
              >
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
