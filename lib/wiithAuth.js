// lib/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/login'); // Redirect to login if not authenticated
        } else {
          setLoading(false); // Auth check complete
        }
      };

      checkUser();
    }, [router]);

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    return <Component {...props} />;
  };
}
