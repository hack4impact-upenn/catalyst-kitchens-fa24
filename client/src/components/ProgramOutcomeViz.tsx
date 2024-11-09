/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
} from '@mui/material';
import { getData } from '../util/api';
import HorizontalBarChart from './HorizontalGraph.tsx';

interface ProgramData {
  org_id: string;
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
  minimumWageIn23: number;
  jobType: string;
  jobCategory?: string;
  alumniHiredByOrg?: number;
}

function ProgramOutcomesVisualization() {
  const [tabValue, setTabValue] = useState(0);
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [avgProgramData, setAvgProgramData] = useState<ProgramData | null>(
    null,
  );
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   const findOrgId = async () => {
  //     try {
  //       const response = await axios.get(`/api/organization/name/${orgName}`);
  //       console.log(response);
  //       setOrgId(response.data._id);
  //     } catch (error) {
  //       console.error('Error fetching specific organization id', error);
  //     }
  //   };
  //   if (orgName) {
  //     findOrgId();
  //   }
  // }, [orgName]);

  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await getData('program.outcomes/organizations');
        const organizationNames = response.data;
        setOrgList(organizationNames);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrgList();
  }, []);

  useEffect(() => {
    const fetchOutcomes = async () => {
      if (!orgName || !year) return;
      try {
        const response = await getData(`program.outcomes/${year}/${orgName}`);
        setProgramData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOutcomes();
  }, [year, orgId, orgName, programData]);

  useEffect(() => {
    const fetchAvgOutcome = async () => {
      try {
        const response = await getData(`program.outcomes/barrierAverage`);
        setAvgProgramData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAvgOutcome();
  }, [avgProgramData]);

  useEffect(() => {
    const settingYearList = async () => {
      if (!orgName) return;
      try {
        const response = await getData(`program.outcomes/get/years/${orgName}`);
        setYearList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    settingYearList();
  }, [orgName, orgId]);

  const handleOrgSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOrg = event.target.value;
    setOrgName(selectedOrg);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="left" sx={{ my: 4 }}>
        Program Outcomes Visualization
      </Typography>

      {/* Year and Organization Selectors */}
      <Grid container spacing={2} sx={{ mb: 4, maxWidth: '500px' }}>
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
            onChange={(event) => setYear(Number(event.target.value))}
            disabled={!orgName}
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
            bgcolor: 'rgb(0,0,0)',
            borderRadius: '14px',
            p: '4px',
            width: '66%',
            marginLeft: 0,
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            {tabNames.map((name, index) => (
              <Tab
                key={name}
                label={name}
                sx={{ color: tabValue === index ? 'black' : 'white' }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Content for each tab */}
      <Box sx={{ p: 2, position: 'relative' }}>
        {tabValue === 0 && programData && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Training Outcomes
            </Typography>
            <Grid container spacing={3}>
              {/* Placeholder for Program Cost per Trainee */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ width: '100%', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" align="left">
                        Student Barriers
                      </Typography>
                      <Typography variant="h6" align="left">
                        Percentage of students experiencing various barriers
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <HorizontalBarChart
                          programData={programData}
                          avgProgramData={avgProgramData}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              {/* Additional training outcomes data placeholders */}
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Demographics
            </Typography>
            <Grid container spacing={3}>
              {/* Placeholder for gender distribution */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Gender Distribution
                    </Typography>
                    <Typography variant="body1" align="center">
                      Placeholder for Gender Data
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Additional demographics data placeholders */}
            </Grid>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Funding & Resources
            </Typography>
            <Grid container spacing={3}>
              {/* Placeholder for funding information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Public Funding
                    </Typography>
                    <Typography variant="body1" align="center">
                      {programData?.fundingPercentFromPublicFunding
                        ? `${programData.fundingPercentFromPublicFunding}%`
                        : 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 3 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Organization Info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      Organization Name
                    </Typography>
                    <Typography variant="body1" align="center">
                      {orgName || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Additional organization info data placeholders */}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ProgramOutcomesVisualization;
