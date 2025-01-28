import * as React from 'react';
import { Grid, Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import DeleteIcon from '@mui/icons-material/Delete';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DataPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (search = '') => {
    setLoading(true);
  
    let query = supabase.from('clients').select('*');
  
    // Add search functionality for both 'name' and 'phone'
    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }
  
    const { data: fetchedData, error } = await query;
  
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(fetchedData || []);
    }
  
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData(); // Fetch all data initially
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchData(e.target.value); // Fetch filtered data based on the search term
  };

  const handleDeleteClient = async (id) => {
    const { data, error } = await supabase.from('clients').delete().eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return;
    }

    // Refresh the table after deletion
    fetchData(searchTerm);
  };

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
              label="Search Patient Name or Phone Number"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Data Table */}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.scheduled_date || 'N/A'}</TableCell>
                  <TableCell>{client.status || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDeleteClient(client.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
