import React from 'react';
import {
  Button,
  Link,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';

export default function VisualizationHome() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <Grid container spacing={4} padding={4}>
        {/* Card for Submit Kitchen Data */}
        <Grid item>
          <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Submit Kitchen Data
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submit data for kitchen outcomes to aid in performance tracking
                and recordkeeping
              </Typography>
              <Link href="/kitchen-outcomes" underline="none">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '50px',
                  }}
                >
                  Kitchen Outcomes Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Program Outcomes Form */}
        <Grid item>
          <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Submit Program Data
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submit data for program outcomes to aid in performance tracking
                and recordkeeping
              </Typography>
              <Link href="/program-outcomes" underline="none">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '50px',
                  }}
                >
                  Program Outcomes Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
