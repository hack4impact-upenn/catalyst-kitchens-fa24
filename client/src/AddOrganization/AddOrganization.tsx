import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import { textAlign } from '@mui/system';
import { postData } from '../util/api';

export default function AddOrganization() {
  type FormState = {
    organizationName: string;
    status: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };

  const defaultState: FormState = {
    organizationName: '',
    status: 'Member',
    street: '',
    city: '',
    state: '',
    zip: '',
  };

  const [newOrg, setNewOrg] = useState<FormState>(defaultState);
  const validateInputs = () => {
    return (
      newOrg.state.length > 0 &&
      newOrg.city.length > 0 &&
      newOrg.zip.length === 5 &&
      newOrg.organizationName.length > 0
    );
  };
  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        console.log(newOrg);
        const response = await postData('organization/new', newOrg);
        console.log('Organization Submitted Successfully: ', response);
        setNewOrg(defaultState);
      } catch (error) {
        console.error('Error submitting program outcome:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={12}>
          <h1 style={{ textAlign: 'center' }}>Add New Organization</h1>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Organization Name"
            name="organizationName"
            value={newOrg.organizationName}
            onChange={(e) => {
              setNewOrg({ ...newOrg, organizationName: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Street"
            name="street"
            value={newOrg.street}
            onChange={(e) => {
              setNewOrg({ ...newOrg, street: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={newOrg.city}
            onChange={(e) => {
              setNewOrg({ ...newOrg, city: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={newOrg.state}
            onChange={(e) => {
              setNewOrg({ ...newOrg, state: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="zip"
            value={newOrg.zip}
            onChange={(e) => {
              setNewOrg({ ...newOrg, zip: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            style={{
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
