import React, { useEffect, useState } from 'react';
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

  // Youth-specific metrics
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
  youthEnrollmentStructure?: 'Staggered' | 'Single' | 'Both';
  youthCompensation?: 'Hourly' | 'Stipend' | 'None';
  youthTrainedDefinition?:
    | 'The first day of program'
    | '2-4 day provisional period'
    | 'One week provisional period'
    | 'Two week provisional period';
  youthGraduatedDefinition?:
    | 'All weeks of program'
    | 'Early exit for employment allowed'
    | 'Other';
  youthOutcomesMeasure?:
    | 'High School Graduation'
    | 'Return to School'
    | 'Family Reunificiation'
    | 'Non-Recidivism'
    | 'Stable Housing'
    | 'Other';

  // Adult-specific metrics
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
  adultEnrollmentStructure?: 'Single Cohort' | 'Staggered';
  adultCompensation?: 'Hourly' | 'Stipend' | 'None';
  adultTrainedDefinition?:
    | 'The first day of program'
    | '2-4 day provisional period'
    | 'One week provisional period'
    | 'Two week provisional period'
    | 'Other';
  adultGraduatedDefinition?: number;

  // Demographics
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

  // Barriers
  barrierReturningCitizensOrFormerlyIncarceratedPersons?: number;
  barrierPhysicalDisability?: number;
  barrierIntellectualOrDevelopmentalDisability?: number;
  barrierUnhoused?: number;
  barrierMentalHealth?: number;
  barrierNewAmericans?: number;
  barrierInRecovery?: number;
  barrierVeteran?: number;

  // Wrap-around services
  wrapAroundServicesHousing?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesLifeSkillsOrSocialEmotionalLearning?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesCaseManagement?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesJobSearchAndPlacement?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesRecoveryTreatment?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesMentalHealthServices?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesHealthcareAllOther?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesChildcare?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  wrapAroundServicesTransportation?:
    | 'You mostly facilitate access through partner agency'
    | 'Your program does not provide or facilitate access'
    | 'You mostly provide in-house';
  otherPleaseSpecifyOtherWrapAroundServices?: string;

  // Funding and certifications
  fundingPercentFromPublicFunding?: number;
  fundingPercentFromPrivateFunding?: number;
  fundingPercentFromSocialEnterpriseOrGeneratedRevenue?: number;
  SNAPEAndT?: 'Yes' | 'No But' | 'No And';
  WIOA?: 'Yes' | 'No But' | 'No And';
  curriculum?: 'All' | 'Part';
  programCertifications?:
    | 'ACF Quality/Approved Program'
    | 'DOL approved apprenticeship'
    | 'State Association apprenticeship'
    | 'Local or State Dept. of Education or Community College'
    | 'Other';
  otherProgramCertifications?: string;
  participantCertifications?:
    | 'Basic Food Safety (eg ServSafe Handler or similar)'
    | 'Advanced Food Safety'
    | 'Credit toward Comm College ACF Certification'
    | 'NRA (eg Pro Start)'
    | 'AHLEI (eg Kitchen Cook)'
    | 'Guest Service Gold'
    | 'Certified Guest Service Professional, etc.)'
    | 'Other';
  otherParticipantCertifications?: string;

  // Employment
  internshipOrExternship?: boolean;
  internshipOrExternshipDescription?: string;
  minimumWage: number;
  jobType: '1-25%' | '26-50%' | '51-75%' | '76-100%';
  jobCategory?:
    | 'Food Service: restaurant, cafe'
    | 'Food Service: institutional'
    | 'Food Service: grocery'
    | 'Customer Service and Retail'
    | 'Transportation & warehousing'
    | 'healthcare & social ssistance'
    | 'safety & maintenance'
    | 'Construction'
    | 'Other';
  alumniHiredByOrg?: number;

  // Organization info
  organizationName: string;
  responderName: string;
  responderTitle: string;
}

function ProgramOutcomesVisualization() {
  const [tabValue, setTabValue] = useState(0);
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [orgList, setOrgList] = useState<string[] | null>(null);
  const [yearList, setYearList] = useState<number[]>([]);
  const [orgName, setOrgName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [year, setYear] = useState<number | ''>('');

  const tabNames = [
    'Summary',
    'Adult Outcomes',
    'Youth Outcomes',
    'Organization Info',
  ];

  // Organization ID fetching
  useEffect(() => {
    const findOrgId = async () => {
      try {
        const response = await getData(`organization/name/${orgName}`);
        setOrgId(response.data.id);
      } catch (error) {
        console.error('Error fetching specific organization id', error);
      }
    };
    findOrgId();
  }, [orgName]);

  // Organization list fetching
  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await getData(`organization/organizations`);
        const organizationNames = response.data.map(
          (org: { organizationName: string }) => org.organizationName,
        );
        setOrgList(organizationNames);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };
    fetchOrgList();
  }, []);

  // Program outcomes data fetching
  useEffect(() => {
    const fetchOutcomes = async () => {
      if (!orgId) return;
      try {
        const response = await getData(`program_outcomes/${year}/${orgId}`);
        setProgramData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOutcomes();
  }, [year, orgId]);

  // Year list fetching
  useEffect(() => {
    const settingYearList = async () => {
      if (!orgId) return;
      try {
        const response = await getData(`program_outcomes/get/years/${orgId}`);
        setYearList(response.data);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };
    settingYearList();
  }, [orgId]);

  const handleOrgSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOrgName(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
            {orgList?.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
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
            onChange={(event) => {
              setYear(Number(event.target.value));
            }}
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

      {/* Content with Overlay */}
      <Box sx={{ position: 'relative' }}>
        {/* Content */}
        <Box sx={{ p: 2 }}>
          {/* Summary Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Program Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, bgcolor: 'rgba(236, 239, 237, 0.5)' }}>
                    <Typography variant="h6" gutterBottom>
                      Program Overview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Cost per Trainee
                        </Typography>
                        <Typography variant="h6">
                          $
                          {programData?.programCostPerTrainee?.toLocaleString() ||
                            'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Total Participants
                        </Typography>
                        <Typography variant="h6">
                          {(
                            (programData?.youthTrained || 0) +
                            (programData?.adultsTrained || 0)
                          ).toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Adult Outcomes Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Adult Program Outcomes
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, bgcolor: 'rgba(236, 239, 237, 0.5)' }}>
                    <Typography variant="h6" gutterBottom>
                      Adult Training Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Adults Trained
                        </Typography>
                        <Typography variant="h6">
                          {programData?.adultsTrained?.toLocaleString() ||
                            'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Average Wage
                        </Typography>
                        <Typography variant="h6">
                          ${programData?.adultWage?.toLocaleString() || 'N/A'}
                          /hr
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Youth Outcomes Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Youth Program Outcomes
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, bgcolor: 'rgba(236, 239, 237, 0.5)' }}>
                    <Typography variant="h6" gutterBottom>
                      Youth Training Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Youth Trained
                        </Typography>
                        <Typography variant="h6">
                          {programData?.youthTrained?.toLocaleString() || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Average Wage
                        </Typography>
                        <Typography variant="h6">
                          ${programData?.youthWage?.toLocaleString() || 'N/A'}
                          /hr
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Organization Info Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Organization Info
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, bgcolor: 'rgba(236, 239, 237, 0.5)' }}>
                    <Typography variant="h6" gutterBottom>
                      Contact Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Organization Name
                        </Typography>
                        <Typography variant="h6">
                          {programData?.organizationName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Responder Name
                        </Typography>
                        <Typography variant="h6">
                          {programData?.responderName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Responder Title
                        </Typography>
                        <Typography variant="h6">
                          {programData?.responderTitle || 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        {/* Overlay when no organization/year selected */}
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
      </Box>
    </Container>
  );
}

export default ProgramOutcomesVisualization;
