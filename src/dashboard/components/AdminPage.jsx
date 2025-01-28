import * as React from 'react';
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
  IconButton,
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import DeleteIcon from '@mui/icons-material/Delete';

// Supabase initialization
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function AdminPage() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const [clientData, setClientData] = React.useState({ name: '', phone: '', address: '' });

  // Fetch report data from Supabase
  const fetchReportData = async () => {
    let query = supabase.from('clients').select('*');

    if (startDate) query = query.gte('scheduled_date', startDate);
    if (endDate) query = query.lte('scheduled_date', endDate);
    if (statusFilter) query = query.eq('status', statusFilter);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    setFilteredData(data || []);
  };

  // Add a new client to Supabase
  const handleAddClient = async () => {
    const { data, error } = await supabase.from('clients').insert([clientData]);

    if (error) {
      console.error('Error adding client:', error);
      return;
    }

    // Clear input fields and refresh the table
    setClientData({ name: '', phone: '', address: '' });
    fetchReportData();
  };

  // Delete a client from Supabase
  const handleDeleteClient = async (id) => {
    const { data, error } = await supabase.from('clients').delete().eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return;
    }

    // Refresh the table after deletion
    fetchReportData();
  };

  React.useEffect(() => {
    fetchReportData();
  }, []); // Fetch data on component mount

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: 'bold' }}>
        Admin Settings
      </Typography>

      {/* Add Client Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Client
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Client Name"
              variant="outlined"
              value={clientData.name}
              onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Client Phone"
              variant="outlined"
              value={clientData.phone}
              onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Client Address"
              variant="outlined"
              value={clientData.address}
              onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddClient}>
              Add Client
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
            <Button variant="contained" color="primary" onClick={fetchReportData}>
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
              <TableCell>Address</TableCell>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.scheduled_date}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteClient(data.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
