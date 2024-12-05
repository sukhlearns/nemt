import * as React from 'react';
import Link from 'next/link'; // Importing Link for client-side navigation
import { useRouter } from 'next/router'; // Importing the useRouter hook
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/' },
  { text: 'Data', icon: <AnalyticsRoundedIcon />, route: '/data' },
  { text: 'Schedule', icon: <PeopleRoundedIcon />, route: '/schedule' },
  { text: 'Dispatch', icon: <AssignmentRoundedIcon />, route: '/dispatch' },
  { text: 'Report', icon: <InfoRoundedIcon />, route: '/report' },
  { text: 'Admin', icon: <SettingsRoundedIcon />, route: '/admin' },
  { text: 'Where’s My Ride', icon: <HelpRoundedIcon />, route: '/ride' },
];

export default function MenuContent() {
  const router = useRouter(); // Initialize the router

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            {/* Wrap each ListItemButton in Link for client-side navigation */}
            <Link href={item.route} passHref>
              <ListItemButton
                selected={router.pathname === item.route} // Check if the current path matches the item's route
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
