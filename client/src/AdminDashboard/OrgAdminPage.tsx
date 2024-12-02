import React from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ScreenGrid from '../components/ScreenGrid.tsx';
import OrgTable from './OrgTable.tsx';
import InviteUserButton from '../components/buttons/InviteUserButton.tsx';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function OrgAdminPage() {
  const navigate = useNavigate();
  return (
    <ScreenGrid>
      <Grid item>
        <Typography variant="h2">
          Welcome to the Admin Organization Dashboard
        </Typography>
      </Grid>
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <OrgTable />
        </div>
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            navigate('/organizations-add');
          }}
          style={{
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Add Organization
        </Button>
      </Grid>
    </ScreenGrid>
  );
}

export default OrgAdminPage;
