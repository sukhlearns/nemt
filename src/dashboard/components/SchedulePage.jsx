import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [scheduledData, setScheduledData] = useState([]);

  // Fetch data from Supabase
  const fetchScheduledData = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;

      setScheduledData(data || []);
    } catch (error) {
      console.error('Error fetching scheduled data:', error.message);
    }
  };

  // Update an existing client's schedule
  const handleSchedule = async () => {
    if (!selectedClientId || !selectedDate) {
      alert('Please select a client and date.');
      return;
    }

    try {
      const { error } = await supabase
        .from('clients')
        .update({ scheduled_date: selectedDate.toISOString(), status: 'Scheduled' })
        .eq('id', selectedClientId);

      if (error) throw error;

      alert('Schedule updated successfully!');
      fetchScheduledData(); // Refresh the data
    } catch (error) {
      console.error('Error updating schedule:', error.message);
    }
  };

  // Search filter
  const filteredData = scheduledData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phone.includes(searchTerm)
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchScheduledData();
  }, []);

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Schedule Ride
      </Typography>

      {/* Scheduling Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Schedule a Ride
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Client"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="client-select-label">Select Client</InputLabel>
              <Select
                labelId="client-select-label"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                label="Select Client"
              >
                {filteredData.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
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
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSchedule}>
              Update Schedule
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Scheduled Rides Table */}
      <TableContainer component={Paper} elevation={3} sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
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
                <TableCell>{data.address}</TableCell>
                <TableCell>
                  {data.scheduled_date
                    ? dayjs(data.scheduled_date).format('YYYY-MM-DD HH:mm A')
                    : 'Not Scheduled'}
                </TableCell>
                <TableCell>{data.status || 'Pending'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
