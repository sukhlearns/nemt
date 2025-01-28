import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useRouter } from 'next/router';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {


  const router = useRouter();

  // Get the current route
  const { pathname } = router;

  // Determine the page to display based on the current route
  let content = "Home";
  if (pathname === '/data') {
    content = "Data";
  }else if (pathname === '/schedule') {
    content = "Schedule";
  }else if (pathname === '/dispatch') {
    content = "Dispatch";
  }else if (pathname === '/report') {
    content = "Report";
  }else if (pathname === '/admin') {
    content = "Admin";
  }else if (pathname === '/ride') {
    content = "Where's My Ride";
  }else {
   
  }




  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {content}
      </Typography>
    </StyledBreadcrumbs>
  );
}
