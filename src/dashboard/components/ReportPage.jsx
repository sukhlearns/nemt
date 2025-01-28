import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ReportPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setFilteredData(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterData = async () => {
    try {
      let query = supabase.from('clients').select('*');

      if (startDate) {
        query = query.gte('scheduled_date', startDate);
      }
      if (endDate) {
        query = query.lte('scheduled_date', endDate);
      }
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error filtering data:', error);
        return;
      }

      setFilteredData(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
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
              value={startDate || ''}
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
              value={endDate || ''}
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
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Report Table */}
      <TableContainer component={Paper} elevation={3} sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
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
                <TableCell>{new Date(data.scheduled_date).toLocaleString()}</TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportPage;
