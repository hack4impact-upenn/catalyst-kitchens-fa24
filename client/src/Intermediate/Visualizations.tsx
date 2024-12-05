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
        {/* Card for Kitchen Visualization */}
        <Grid item>
          <Card sx={{ maxWidth: 470, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                View Kitchen Data
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                View data for kitchen outcomes to track performance and results.
              </Typography>
              <Link href="/kitchen-outcomes-viz" underline="none">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '50px',
                  }}
                >
                  View Visualizations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Card for Program Visualization */}
        <Grid item>
          <Card sx={{ maxWidth: 470, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                View Program Data
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                View data for program outcomes to track performance and results.
              </Typography>
              <Link href="/program-outcomes-viz" underline="none">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '50px',
                  }}
                >
                  View Visualizations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
