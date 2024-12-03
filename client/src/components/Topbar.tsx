import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
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

function Topbar({ email }: { email: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    postData('auth/logout');
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
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
        <Button color="inherit" onClick={handleMenuOpen}>
          Account
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>{email}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
