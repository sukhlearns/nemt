import * as React from 'react';
import { createClient } from '@supabase/supabase-js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminDashboard() {
  const [dataCards, setDataCards] = React.useState([
    { title: 'Users', value: '0', description: 'Total users in the database' },
    { title: 'Monthly Events', value: '0', description: 'Completed events this month' },
    { title: 'Total Events', value: '0', description: 'Total completed events' },
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const { count: totalUsers, error: userError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
        if (userError) throw userError;

        // Fetch monthly completed events
        const { count: monthlyEvents, error: monthlyError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Completed')
          .gte('scheduled_date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
        if (monthlyError) throw monthlyError;

        // Fetch total completed events
        const { count: totalEvents, error: eventsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Completed');
        if (eventsError) throw eventsError;

        // Update data cards
        setDataCards([
          { title: 'Users', value: totalUsers || '0', description: 'Total users in the database' },
          { title: 'Monthly Events', value: monthlyEvents || '0', description: 'Completed events this month' },
          { title: 'Total Events', value: totalEvents || '0', description: 'Total completed events' },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

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
    </Box>
  );
}
