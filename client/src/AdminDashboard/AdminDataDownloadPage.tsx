import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Slider,
  Button,
  Snackbar,
  IconButton,
  SnackbarCloseReason,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import * as XLSX from 'xlsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as FileSaver from 'file-saver';
import { getData } from '../util/api';

function AdminDataDownloadPage() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [queryTrigger, setQueryTrigger] = useState<boolean>(false);
  const [programDataRetrieved, setProgramDataRetrieved] = useState<any[]>([]);
  const [kitchenDataRetrieved, setKitchenDataRetrieved] = useState<any[]>([]);
  const [showProgramSnackBar, setShowProgramSnackBar] =
    useState<boolean>(false);
  const [showKitchenSnackBar, setShowKitchenSnackBar] =
    useState<boolean>(false);

  useEffect(() => {
    const pullProgramData = async () => {
      const programData = await getData(
        `program_outcomes/year/${selectedYear}`,
      );
      if (programData) {
        const { data } = programData;
        if (data && data.length > 0) {
          setProgramDataRetrieved(data);
        } else {
          console.log('no program outcomes found');
          setShowProgramSnackBar(true);
          setProgramDataRetrieved([]);
        }
      }
    };
    const pullKitchenData = async () => {
      const kitchenData = await getData(
        `kitchen_outcomes/year/${selectedYear}`,
      );
      if (kitchenData) {
        const { data } = kitchenData;
        if (data && data.length > 0) {
          setKitchenDataRetrieved(data);
        } else {
          console.log('no kitchen outcomes found');
          setShowKitchenSnackBar(true);
          setKitchenDataRetrieved([]);
        }
      }
    };
    if (queryTrigger) {
      pullProgramData();
      pullKitchenData();
      setQueryTrigger(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTrigger]);
  useEffect(() => {
    const clearDataCollected = () => {
      setProgramDataRetrieved([]);
      setKitchenDataRetrieved([]);
    };
    clearDataCollected();
  }, [selectedYear]);
  const handleProgramDataDownload = () => {
    if (programDataRetrieved.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(programDataRetrieved);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Program Data');
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(blob, `ProgramData_${selectedYear}.xlsx`);
    }
  };

  const handleKitchenDataDownload = () => {
    if (kitchenDataRetrieved.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(kitchenDataRetrieved);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Kitchen Data');
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(blob, `KitchenData_${selectedYear}.xlsx`);
    }
  };
  const handleKitchenOutcomesClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowKitchenSnackBar(false);
  };
  const kitchenOutcomesAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleKitchenOutcomesClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );
  const handleProgramOutcomesClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowProgramSnackBar(false);
  };
  const programOutcomesAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleProgramOutcomesClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h2">Admin Data Download</Typography>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Slider
          sx={{ color: 'black' }}
          value={selectedYear}
          min={2017}
          max={2040}
          step={1}
          getAriaValueText={(v) => `${v}`}
          onChange={(e, v) => {
            setSelectedYear(v as number);
          }}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={3} />
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setQueryTrigger(true);
          }}
          sx={{ backgroundColor: 'black', color: 'white' }}
        >
          <Typography variant="subtitle1">
            Download Data From Year {selectedYear}
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={12} sx={{ marginTop: '50px' }} />
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        {programDataRetrieved.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleProgramDataDownload}
          >
            <Typography variant="subtitle1">
              Download Program Outcomes Data as Excel Sheet
            </Typography>
          </Button>
        )}
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        {kitchenDataRetrieved.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleKitchenDataDownload}
          >
            <Typography variant="subtitle1">
              Download Kitchen Outcomes Data as Excel Sheet
            </Typography>
          </Button>
        )}
      </Grid>
      <Snackbar
        open={showKitchenSnackBar}
        autoHideDuration={6000}
        onClose={handleKitchenOutcomesClose}
        message="No Kitchen Outcomes Found"
        action={kitchenOutcomesAction}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
      <Snackbar
        open={showProgramSnackBar}
        autoHideDuration={6000}
        onClose={handleProgramOutcomesClose}
        message="No Program Outcomes Found"
        action={programOutcomesAction}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </Grid>
  );
}

export default AdminDataDownloadPage;
