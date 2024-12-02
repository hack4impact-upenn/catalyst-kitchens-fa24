import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import { textAlign } from '@mui/system';
import { useParams } from 'react-router-dom';
import { postData, getData } from '../util/api';

export default function EditOrganization() {
  const { orgId } = useParams();
  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];
  type FormState = {
    organizationName: string;
    status: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    id: string | undefined;
  };

  const defaultState: FormState = {
    organizationName: '',
    status: 'Member',
    street: '',
    city: '',
    state: '',
    zip: '',
    id: orgId,
  };
  const [newOrg, setNewOrg] = useState<FormState>(defaultState);
  type Notification = {
    message: string;
    open: boolean;
  };
  const defaultNotification: Notification = {
    message: 'Organization Information has been successfully edited',
    open: false,
  };
  const [notificationEdit, setNotificationEdit] =
    useState<Notification>(defaultNotification);
  useEffect(() => {
    const getOrgInformation = async () => {
      if (orgId) {
        const result = await getData(`organization/id/${orgId}`);
        console.log(result);
        if (result) {
          const { data } = result;
          setNewOrg({
            ...newOrg,
            organizationName: data?.organizationName,
            street: data?.street,
            city: data?.city,
            state: data?.state,
            zip: data?.zip,
          });
        } else {
          console.log('No available organization');
        }
      } else {
        console.log('No defined organization id');
      }
    };
    getOrgInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId]);
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
        const response = await postData('organization/edit', newOrg);
        if (response.data) {
          console.log('Organization Submitted Successfully: ', response.data);
          setNotificationEdit({ ...notificationEdit, open: true });
        }
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
          <h1 style={{ textAlign: 'center' }}>Organization Information</h1>
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
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              label="State"
              name="state"
              value={newOrg.state}
              onChange={(e) => {
                // Update the state with the two-letter abbreviation
                setNewOrg({ ...newOrg, state: e.target.value });
                console.log(newOrg);
              }}
            >
              {states.map((state) => (
                <MenuItem key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            Update Organization Information
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={notificationEdit.open}
        autoHideDuration={3000}
        onClose={() => {
          setNotificationEdit({ ...notificationEdit, open: false });
        }}
        message={notificationEdit.message}
      />
    </div>
  );
}
