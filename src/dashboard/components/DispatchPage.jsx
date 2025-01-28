import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DispatchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [scheduledData, setScheduledData] = useState([]);
  const [dispatchStatus, setDispatchStatus] = useState("Pending");

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error("Error fetching clients:", error.message);
      } else {
        setScheduledData(data);
      }
    };
    fetchClients();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleDateChange = (newValue) => setSelectedDate(newValue);

  const handleDispatch = async () => {
    if (!selectedClient || !selectedDate) {
      alert("Please select a client and a date.");
      return;
    }

    const client = scheduledData.find((data) => data.name === selectedClient);

    if (!client) {
      alert("Selected client not found.");
      return;
    }

    const updatedClient = {
      scheduled_date: selectedDate.toISOString(),
      status: dispatchStatus,
    };

    const { error } = await supabase
      .from("clients")
      .update(updatedClient)
      .eq("id", client.id);

    if (error) {
      console.error("Error updating client:", error.message);
      alert("Failed to update client details.");
    } else {
      alert("Client details updated successfully!");
      setScheduledData((prevData) =>
        prevData.map((data) =>
          data.id === client.id
            ? { ...data, ...updatedClient }
            : data
        )
      );
    }
  };

  const filteredData = scheduledData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phone.includes(searchTerm)
  );

  return (
    <Box sx={{ width: "100%", p: 0 }}>
      <Typography variant="h4" sx={{ mt: 3, fontWeight: "bold" }}>
        Dispatch Ride
      </Typography>

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
            <Button variant="contained" color="primary" onClick={handleDispatch}>
              Dispatch Ride
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
            {scheduledData.map((data) => (
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
}
