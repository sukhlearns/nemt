import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WorldMap from './WorldMap'; // Assuming you have a map component to track the vehicle

// Sample ride details (replace with dynamic data)
const rideDetails = {
  rideId: 'R001',
  driverName: 'John Doe',
  vehicleInfo: 'Toyota Prius - ABC123',
  status: 'In Transit',
  eta: '10 mins',
  pickupLocation: '123 Main St, Springfield',
  dropOffLocation: '456 Elm St, Shelbyville',
  vehicleLocation: { lat: 40.7128, lng: -74.0060 }, // Current location for map
};

export default function RideTrackingPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Where&apos;s My Ride
      </Typography>

      {/* Ride Overview */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Ride ID</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {rideDetails.rideId}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Status</Typography>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {rideDetails.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ETA: {rideDetails.eta}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Driver</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {rideDetails.driverName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vehicle: {rideDetails.vehicleInfo}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Ride Map */}
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <WorldMap location={rideDetails.vehicleLocation} />
        </Paper>
      </Grid>

      {/* Pickup & Drop-off Info */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Pickup Location</Typography>
            <Typography variant="body1">{rideDetails.pickupLocation}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Drop-off Location</Typography>
            <Typography variant="body1">{rideDetails.dropOffLocation}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search Functionality */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Search Ride"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
