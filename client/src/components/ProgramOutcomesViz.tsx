/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid,
  Card,
  TextField,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
} from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { getData } from '../util/api';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

interface ProgramData {
  orgId: string;
  year: Date;
  programCostPerTrainee?: number;
  programDesignedForYouthAndAdults?: boolean;
  youthTrained?: number;
  youthProgramRetentionRate?: number;
  youthPositiveOutcomes?: number;
  youthWage?: number;
  youthJobRetentionThreeMonths?: number;
  youthJobRetentionSixMonths?: number;
  youthJobRetentionTwelveMonths?: number;
  youthJobRetentionTwentyFourMonths?: number;
  youthProgramWeeks?: number;
  youthProgramHours?: number;
  youthEnrollmentStructure?: string;
  youthCompensation?: string;
  youthTrainedDefinition?: string;
  youthGraduatedDefinition?: string;
  youthOutcomesMeasure?: string;
  programsThatServeAdults: boolean;
  adultsTrained?: number;
  adultsGraduated?: number;
  adultPositiveOutcome?: number;
  adultJobPlacement?: number;
  adultWage?: number;
  adultJobRetentionThreeMonths?: number;
  adultJobRetentionSixMonths?: number;
  adultWageAtSixMonths?: number;
  adultJobRetentionTwelveMonths?: number;
  adultWageAtTwelveMonths?: number;
  adultJobRetentionTwentyFourMonths?: number;
  adultWageTwentyFourMonths?: number;
  adultProgramWeeks?: number;
  adultProgramHours?: number;
  adultEnrollmentStructure?: string;
  adultCompensation?: string;
  adultTrainedDefinition?: string;
  adultGraduatedDefinition?: number;
  traineeAge?: number;
  traineePercentFemale?: number;
  traineePercentMale?: number;
  traineePercentNonBinary?: number;
  traineePercentTransgender?: number;
  traineePercentAmericanIndian?: number;
  traineePercentAsianOrAsianAmerican?: number;
  traineePercentBlackOrAfricanAmerican?: number;
  traineePercentLatinaLatinoLatinx?: number;
  traineePercentNativeHawaiianPacificIslander?: number;
  traineeMultiracial?: number;
  traineeWhite?: number;
  traineeOtherRace?: number;
  traineeRaceUnknown?: number;
  barrierReturningCitizensOrFormerlyIncarceratedPersons?: number;
  barrierPhysicalDisability?: number;
  barrierIntellectualOrDevelopmentalDisability?: number;
  barrierUnhoused?: number;
  barrierMentalHealth?: number;
  barrierNewAmericans?: number;
  barrierInRecovery?: number;
  barrierVeteran?: number;
  wrapAroundServicesHousing?: string;
  wrapAroundServicesLifeSkillsOrSocialEmotionalLearning?: string;
  wrapAroundServicesCaseManagement?: string;
  wrapAroundServicesJobSearchAndPlacement?: string;
  wrapAroundServicesRecoveryTreatment?: string;
  wrapAroundServicesMentalHealthServices?: string;
  wrapAroundServicesHealthcareAllOther?: string;
  wrapAroundServicesChildcare?: string;
  wrapAroundServicesTransportation?: string;
  otherPleaseSpecifyOtherWrapAroundServices?: string;
  fundingPercentFromPublicFunding?: number;
  fundingPercentFromPrivateFunding?: number;
  fundingPercentFromSocialEnterpriseOrGeneratedRevenue?: number;
  SNAPEAndT?: string;
  WIOA?: string;
  curriculum?: string;
  programCertifications?: string;
  otherProgramCertifications?: string;
  participantCertifications?: string;
  otherParticipantCertifications?: string;
  internshipOrExternship?: boolean;
  internshipOrExternshipDescription?: string;
  minimumWage: number;
  jobType: string;
  jobCategory?: string;
  alumniHiredByOrg?: number;
  organizationName: string;
  responderName: string;
  responderTitle: string;
}

interface OrgNameToId {
  [key: string]: string;
}

interface NetworkComparison {
  value: number | null;
  networkAverage: number | null;
}

interface SummaryData {
  barriers: {
    returningCitizens: NetworkComparison;
    physicalDisability: NetworkComparison;
    intellectualDisability: NetworkComparison;
    unhoused: NetworkComparison;
    mentalHealth: NetworkComparison;
    newAmericans: NetworkComparison;
    inRecovery: NetworkComparison;
    veteran: NetworkComparison;
  };
  demographics: {
    gender: {
      female: NetworkComparison;
      male: NetworkComparison;
      nonBinary: NetworkComparison;
      transgender: NetworkComparison;
    };
    race: {
      americanIndian: NetworkComparison;
      asian: NetworkComparison;
      black: NetworkComparison;
      latino: NetworkComparison;
      pacificIslander: NetworkComparison;
      multiracial: NetworkComparison;
      white: NetworkComparison;
      other: NetworkComparison;
      unknown: NetworkComparison;
    };
  };
  adultOutcomes: {
    enrolled: NetworkComparison;
    completion: NetworkComparison;
    jobPlacement: NetworkComparison;
    retention6Months: NetworkComparison;
    retention12Months: NetworkComparison;
    retention24Months: NetworkComparison;
  };
  youthOutcomes: {
    enrolled: NetworkComparison;
    completion: NetworkComparison;
    jobPlacement: NetworkComparison;
    retention3Months: NetworkComparison;
    retention6Months: NetworkComparison;
    retention12Months: NetworkComparison;
  };
}

function ProgramOutcomesVisualization() {
  const [tabValue, setTabValue] = useState(0);
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [orgList, setOrgList] = useState<string[] | null>(null);
  const [yearList, setYearList] = useState<number[]>([]);
  const [orgName, setOrgName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [orgMap, setOrgMap] = useState<OrgNameToId>({});
  const [alert, setAlert] = useState<{
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string;
  } | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

  const tabNames = [
    'Summary',
    'Adult Outcomes',
    'Youth Outcomes',
    'Organization Info',
  ];

  // Fetch the list of organizations
  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await getData(`organization/organizations`);
        const orgNameToIdMap: OrgNameToId = {};
        response.data.forEach(
          (org: { organizationName: string; _id: string }) => {
            orgNameToIdMap[org.organizationName] = org._id;
          },
        );
        setOrgMap(orgNameToIdMap);
        setOrgList(Object.keys(orgNameToIdMap));
      } catch (error) {
        console.error('Error fetching organization list:', error);
      }
    };
    fetchOrgList();
  }, []);

  // Fetch program outcomes data based on the selected year and organization ID
  useEffect(() => {
    const fetchProgramOutcomes = async () => {
      if (!orgId || !year) return;
      console.log(
        `Fetching program outcomes for orgId: ${orgId}, year: ${year}`,
      );
      try {
        const url = `program_outcomes/org/${orgId}/${year}`;
        console.log('Fetching from URL:', url);
        const response = await getData(url);

        if (!response || !response.data) {
          console.log('No program outcomes found for this org and year');
          setProgramData(null);
          return;
        }

        console.log('Program outcomes response:', response.data);

        if (response.data.orgId !== orgId) {
          console.error('Mismatched orgId in response:', {
            expected: orgId,
            received: response.data.orgId,
          });
        }

        setProgramData(response.data);
      } catch (error) {
        console.error('Error fetching program outcomes:', error);
        console.error('Error details:', {
          orgId,
          year,
          errorMessage:
            error instanceof Error ? error.message : 'Unknown error',
        });
        setProgramData(null);
      }
    };

    if (orgId && year) {
      console.log('Triggering fetch with:', { orgId, year });
      fetchProgramOutcomes();
    }
  }, [year, orgId]);
  // Handle alerts
  const handleAlert = (
    severity: 'error' | 'warning' | 'info' | 'success',
    message: string,
  ) => {
    setAlert({ severity, message });
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlert(null);
    setAlertOpen(false);
  };

  // Fetch the list of years for the selected organization
  useEffect(() => {
    const fetchYearList = async () => {
      if (!orgId) return;
      console.log('Fetching years for orgId:', orgId);
      try {
        const response = await getData(`program_outcomes/org/${orgId}/years`);
        console.log('Years response:', response.data);
        setYearList(response.data);
        if (response.data.length === 0) {
          handleAlert('warning', 'No data available for this organization');
        }
      } catch (error) {
        console.error('Error fetching years:', error);
        handleAlert('error', 'Error fetching program outcomes years');
      }
    };
    fetchYearList();
  }, [orgId]);

  // Handle organization selection - update to use orgMap directly
  const handleOrgSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedOrgName = event.target.value;
    console.log('Selected org name:', selectedOrgName);
    console.log('OrgMap:', orgMap);
    console.log('Setting orgId to:', orgMap[selectedOrgName]);
    setOrgName(selectedOrgName);
    setOrgId(orgMap[selectedOrgName]);
    setYear('');
    setProgramData(null);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Add function to fetch network average
  const fetchNetworkAverage = async (field: string, selectedYear: number) => {
    console.log(
      `Fetching network average for field: ${field}, year: ${selectedYear}`,
    );
    try {
      const response = await getData(
        `program_outcomes/network-average/${field}/${selectedYear}`,
      );
      console.log(`Network average response for ${field}:`, response.data);
      return response.data.average;
    } catch (error) {
      console.error(`Error fetching network average for ${field}:`, error);
      return null;
    }
  };

  // Wrap fetchSummaryData in useCallback
  const fetchSummaryData = useCallback(
    async (selectedYear: number) => {
      console.log('Fetching summary data for year:', selectedYear);
      console.log('Current programData:', programData);
      if (!programData) return;

      const summary: SummaryData = {
        barriers: {
          returningCitizens: {
            value:
              programData.barrierReturningCitizensOrFormerlyIncarceratedPersons ||
              null,
            networkAverage: await fetchNetworkAverage(
              'barrierReturningCitizensOrFormerlyIncarceratedPersons',
              selectedYear,
            ),
          },
          physicalDisability: {
            value: programData.barrierPhysicalDisability || null,
            networkAverage: await fetchNetworkAverage(
              'barrierPhysicalDisability',
              selectedYear,
            ),
          },
          intellectualDisability: {
            value:
              programData.barrierIntellectualOrDevelopmentalDisability || null,
            networkAverage: await fetchNetworkAverage(
              'barrierIntellectualOrDevelopmentalDisability',
              selectedYear,
            ),
          },
          unhoused: {
            value: programData.barrierUnhoused || null,
            networkAverage: await fetchNetworkAverage(
              'barrierUnhoused',
              selectedYear,
            ),
          },
          mentalHealth: {
            value: programData.barrierMentalHealth || null,
            networkAverage: await fetchNetworkAverage(
              'barrierMentalHealth',
              selectedYear,
            ),
          },
          newAmericans: {
            value: programData.barrierNewAmericans || null,
            networkAverage: await fetchNetworkAverage(
              'barrierNewAmericans',
              selectedYear,
            ),
          },
          inRecovery: {
            value: programData.barrierInRecovery || null,
            networkAverage: await fetchNetworkAverage(
              'barrierInRecovery',
              selectedYear,
            ),
          },
          veteran: {
            value: programData.barrierVeteran || null,
            networkAverage: await fetchNetworkAverage(
              'barrierVeteran',
              selectedYear,
            ),
          },
        },
        demographics: {
          gender: {
            female: {
              value: programData.traineePercentFemale || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentFemale',
                selectedYear,
              ),
            },
            male: {
              value: programData.traineePercentMale || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentMale',
                selectedYear,
              ),
            },
            nonBinary: {
              value: programData.traineePercentNonBinary || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentNonBinary',
                selectedYear,
              ),
            },
            transgender: {
              value: programData.traineePercentTransgender || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentTransgender',
                selectedYear,
              ),
            },
          },
          race: {
            americanIndian: {
              value: programData.traineePercentAmericanIndian || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentAmericanIndian',
                selectedYear,
              ),
            },
            asian: {
              value: programData.traineePercentAsianOrAsianAmerican || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentAsianOrAsianAmerican',
                selectedYear,
              ),
            },
            black: {
              value: programData.traineePercentBlackOrAfricanAmerican || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentBlackOrAfricanAmerican',
                selectedYear,
              ),
            },
            latino: {
              value: programData.traineePercentLatinaLatinoLatinx || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentLatinaLatinoLatinx',
                selectedYear,
              ),
            },
            pacificIslander: {
              value:
                programData.traineePercentNativeHawaiianPacificIslander || null,
              networkAverage: await fetchNetworkAverage(
                'traineePercentNativeHawaiianPacificIslander',
                selectedYear,
              ),
            },
            multiracial: {
              value: programData.traineeMultiracial || null,
              networkAverage: await fetchNetworkAverage(
                'traineeMultiracial',
                selectedYear,
              ),
            },
            white: {
              value: programData.traineeWhite || null,
              networkAverage: await fetchNetworkAverage(
                'traineeWhite',
                selectedYear,
              ),
            },
            other: {
              value: programData.traineeOtherRace || null,
              networkAverage: await fetchNetworkAverage(
                'traineeOtherRace',
                selectedYear,
              ),
            },
            unknown: {
              value: programData.traineeRaceUnknown || null,
              networkAverage: await fetchNetworkAverage(
                'traineeRaceUnknown',
                selectedYear,
              ),
            },
          },
        },
        adultOutcomes: {
          enrolled: {
            value: programData.adultsTrained || null,
            networkAverage: await fetchNetworkAverage(
              'adultsTrained',
              selectedYear,
            ),
          },
          completion: {
            value: programData.adultsGraduated || null,
            networkAverage: await fetchNetworkAverage(
              'adultsGraduated',
              selectedYear,
            ),
          },
          jobPlacement: {
            value: programData.adultJobPlacement || null,
            networkAverage: await fetchNetworkAverage(
              'adultJobPlacement',
              selectedYear,
            ),
          },
          retention6Months: {
            value: programData.adultJobRetentionSixMonths || null,
            networkAverage: await fetchNetworkAverage(
              'adultJobRetentionSixMonths',
              selectedYear,
            ),
          },
          retention12Months: {
            value: programData.adultJobRetentionTwelveMonths || null,
            networkAverage: await fetchNetworkAverage(
              'adultJobRetentionTwelveMonths',
              selectedYear,
            ),
          },
          retention24Months: {
            value: programData.adultJobRetentionTwentyFourMonths || null,
            networkAverage: await fetchNetworkAverage(
              'adultJobRetentionTwentyFourMonths',
              selectedYear,
            ),
          },
        },
        youthOutcomes: {
          enrolled: {
            value: programData.youthTrained || null,
            networkAverage: await fetchNetworkAverage(
              'youthTrained',
              selectedYear,
            ),
          },
          completion: {
            value: programData.youthProgramRetentionRate || null,
            networkAverage: await fetchNetworkAverage(
              'youthProgramRetentionRate',
              selectedYear,
            ),
          },
          jobPlacement: {
            value: programData.youthPositiveOutcomes || null,
            networkAverage: await fetchNetworkAverage(
              'youthPositiveOutcomes',
              selectedYear,
            ),
          },
          retention3Months: {
            value: programData.youthJobRetentionThreeMonths || null,
            networkAverage: await fetchNetworkAverage(
              'youthJobRetentionThreeMonths',
              selectedYear,
            ),
          },
          retention6Months: {
            value: programData.youthJobRetentionSixMonths || null,
            networkAverage: await fetchNetworkAverage(
              'youthJobRetentionSixMonths',
              selectedYear,
            ),
          },
          retention12Months: {
            value: programData.youthJobRetentionTwelveMonths || null,
            networkAverage: await fetchNetworkAverage(
              'youthJobRetentionTwelveMonths',
              selectedYear,
            ),
          },
        },
      };

      setSummaryData(summary);
    },
    [programData],
  ); // Add programData as a dependency

  // Update the useEffect to include fetchSummaryData in dependencies
  useEffect(() => {
    console.log('Summary data useEffect triggered');
    console.log('Current programData:', programData);
    console.log('Current year:', year);
    if (programData && year) {
      fetchSummaryData(Number(year));
    }
  }, [programData, year, fetchSummaryData]); // Add fetchSummaryData to dependencies

  // Add the summary tab content
  const renderSummaryTab = () => {
    if (!summaryData) return <Typography>Loading summary data...</Typography>;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Student Barriers (Compared to Network Average)
          </Typography>
          {/* Add barrier comparison visualization */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Demographics
          </Typography>
          {/* Add demographics visualization */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Adult Outcomes
          </Typography>
          {/* Add adult outcomes visualization */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Youth Outcomes
          </Typography>
          {/* Add youth outcomes visualization */}
        </Grid>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="left" sx={{ my: 4 }}>
        Program Outcomes Visualization
      </Typography>

      {/* Selectors */}
      <Grid
        container
        spacing={2}
        sx={{
          mb: 4,
          maxWidth: '500px',
        }}
      >
        <Grid item xs={7}>
          <TextField
            label="Organization"
            variant="outlined"
            select
            size="small"
            fullWidth
            value={orgName}
            onChange={handleOrgSelection}
          >
            {Object.entries(orgMap).map(([name, id]) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            )) ?? []}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Year"
            variant="outlined"
            select
            size="small"
            fullWidth
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            disabled={!orgName || yearList.length === 0}
          >
            {yearList.map((availableYear) => (
              <MenuItem key={availableYear} value={availableYear}>
                {availableYear}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <Box
          sx={{
            bgcolor: '#555',
            borderRadius: '14px',
            p: '4px',
            width: '66%',
            marginLeft: 0,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              minHeight: 'unset',
              '& .MuiTabs-flexContainer': {
                gap: 1.2,
                padding: '2px',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .Mui-selected': {
                color: '#000 !important',
              },
            }}
          >
            {tabNames.map((name, index) => (
              <Tab
                key={name}
                label={name}
                sx={{
                  color: tabValue === index ? 'black' : 'white',
                  bgcolor: tabValue === index ? 'white' : 'transparent',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: tabValue === index ? 'bold' : 'normal',
                  transition: 'all 0.3s ease-in-out',
                  minHeight: '34px',
                  padding: '6px 16px',
                  margin: '0px',
                  '&:hover': {
                    bgcolor: tabValue === index ? 'white' : '#666',
                    color: tabValue === index ? 'black' : 'white',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative' }}>
        {(!orgName || !year) && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              minHeight: '400px',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#666',
                textAlign: 'center',
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              }}
            >
              Please Choose an Organization and Year
            </Typography>
          </Box>
        )}

        {/* Tab Content */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Program Summary: {orgName || 'N/A'}
            </Typography>
            {renderSummaryTab()}
          </Box>
        )}
        {tabValue === 1 && <Typography variant="h6">Adult Outcomes</Typography>}
        {tabValue === 2 && <Typography variant="h6">Youth Outcomes</Typography>}
        {tabValue === 3 && (
          <Typography variant="h6">Organization Info</Typography>
        )}
      </Box>
    </Container>
  );
}

export default ProgramOutcomesVisualization;
