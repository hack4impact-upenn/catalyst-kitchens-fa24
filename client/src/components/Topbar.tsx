import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../util/api';

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/organizations':
      return 'Organization Dashboard';
    case '/organizations-add':
      return 'Add Organization';
    case '/organizations-update':
      return 'Edit Organization';
    case '/users':
      return 'User Dashboard';
    case '/program-outcomes':
      return 'Program Outcomes Form';
    case '/kitchen-outcomes':
      return 'Kitchen Outcomes Form';
    case '/outcome-form':
      return 'Outcome Submission Forms';
    case '/outcome-viz':
      return 'Outcome Visualizations';
    case '/kitchen-outcomes-viz':
      return 'Kitchen Outcomes Visualizations';
    case '/program-outcomes-viz':
      return 'Program Outcomes Visualizations';
    case '/home':
      return 'Dashboard Home';
    default:
      return 'Dashboard';
  }
};

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = async () => {
    postData('auth/logout');
    navigate('/login');
  };

  return (
    <AppBar
      position="relative"
      sx={{
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
