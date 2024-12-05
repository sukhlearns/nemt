import * as React from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid'; // Home page
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

// Additional page components
import DataPage from './components/DataPage';
import SchedulePage from './components/SchedulePage';
import DispatchPage from './components/DispatchPage';
import ReportPage from './components/ReportPage.jsx';
import AdminPage from './components/AdminPage.jsx';
import RidePage from './components/RidePage';


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const router = useRouter();

  // Get the current route
  const { pathname } = router;

  // Determine the page to display based on the current route
  let content;
  if (pathname === '/data') {
    content = <DataPage />;
  }else if (pathname === '/schedule') {
    content = <SchedulePage />;
  }else if (pathname === '/dispatch') {
  content = <DispatchPage />;
  }else if (pathname === '/report') {
  content = <ReportPage />;
  }else if (pathname === '/admin') {
    content = <AdminPage />;
  }else if (pathname === '/ride') {
    content = <RidePage />;
  }else {
    content = <MainGrid />; // Default page for Home
  }

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {content} {/* Render the page based on the current route */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
