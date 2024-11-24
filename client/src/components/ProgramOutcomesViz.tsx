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
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartOptions,
  Scale,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry,
  CoreScaleOptions,
  Tick,
  PointElement,
  LineElement,
} from 'chart.js';
import { getData } from '../util/api';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
);

// Add this type definition for the chart options
type BarChartOptions = ChartOptions<'bar'> & {
  scales: {
    x: ScaleOptionsByType<keyof CartesianScaleTypeRegistry> & {
      grid: {
        color: string;
        display?: boolean;
        borderColor?: string;
        borderWidth?: number;
        circular?: boolean;
        borderDash?: number[];
        drawBorder?: boolean;
        drawOnChartArea?: boolean;
        drawTicks?: boolean;
        tickBorderDash?: number[];
        tickBorderDashOffset?: number;
        tickColor?: string;
        offset?: boolean;
        z?: number;
        borderDashOffset: number;
        lineWidth: number;
        tickLength: number;
        tickWidth: number;
      };
      ticks: {
        color: string;
        callback: (
          this: Scale<CoreScaleOptions>,
          tickValue: number | string,
          index: number,
          ticks: Tick[],
        ) => string;
        backdropColor?: string;
        backdropPadding?: number;
        display?: boolean;
        font?: {
          size?: number;
        };
        padding?: number;
        textStrokeColor?: string;
        textStrokeWidth?: number;
        z?: number;
        major?: {
          enabled?: boolean;
        };
        showLabelBackdrop?: boolean;
      };
      title: {
        display: boolean;
        text: string;
        color: string;
        align?: 'start' | 'center' | 'end';
        font?: {
          size?: number;
        };
        padding?: number;
      };
    };
    y: ScaleOptionsByType<keyof CartesianScaleTypeRegistry> & {
      grid: {
        display: boolean;
        borderColor?: string;
        borderWidth?: number;
        circular?: boolean;
        color?: string;
        drawBorder?: boolean;
        drawOnChartArea?: boolean;
        drawTicks?: boolean;
        tickBorderDash?: number[];
        tickBorderDashOffset?: number;
        tickColor?: string;
        offset?: boolean;
        z?: number;
      };
      ticks: {
        color: string;
        font: {
          size: number;
        };
        backdropColor?: string;
        backdropPadding?: number;
        display?: boolean;
        padding?: number;
        textStrokeColor?: string;
        textStrokeWidth?: number;
        z?: number;
        major?: {
          enabled?: boolean;
        };
        showLabelBackdrop?: boolean;
        callback?: (
          this: Scale<CoreScaleOptions>,
          tickValue: number | string,
          index: number,
          ticks: Tick[],
        ) => string;
      };
    };
  };
};

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
    retention3Months: NetworkComparison; // Add this line
    retention6Months: NetworkComparison;
    retention12Months: NetworkComparison;
    retention24Months: NetworkComparison;
  };
  youthOutcomes: {
    enrolled: NetworkComparison;
    completed: {
      count: NetworkComparison;
      percentage: NetworkComparison;
    };
    positiveOutcomes: NetworkComparison;
  };
}

interface MetricSummaryProps {
  summaryData: SummaryData;
}

// Move these constants to the top of the file, before any component definitions
const chartColors = {
  org: 'rgba(204, 197, 143, 0.85)', // Soot yellow - more muted and earthy
  network: 'rgba(51, 51, 51, 0.85)', // Keeping the same soot color
};

// Update the baseBarOptions with correct types
const baseBarOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: {
      type: 'linear',
      beginAtZero: true,
      max: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        display: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderDash: [],
        borderDashOffset: 0,
        lineWidth: 1,
        tickBorderDash: [],
        tickBorderDashOffset: 0,
        tickLength: 8,
        tickWidth: 1,
        z: 0,
      },
      ticks: {
        color: '#666',
        callback(this: Scale<CoreScaleOptions>, tickValue: number | string) {
          return `${Math.round(Number(tickValue))}%`;
        },
        font: { size: 11 },
        padding: 4,
      },
    },
    y: {
      type: 'category',
      grid: {
        display: false,
      },
      ticks: {
        color: '#666',
        font: { size: 11 },
        padding: 4,
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        color: '#666',
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleColor: '#fff',
      bodyColor: '#fff',
      cornerRadius: 4,
      callbacks: {
        label(context: any) {
          const value = context.raw || 0;
          return `${Math.round(value)}%`;
        },
      },
    },
  },
};

function AdultMetricSummary({ summaryData }: MetricSummaryProps) {
  const metricCardStyle = {
    p: 2,
    borderRadius: 1,
    bgcolor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  };

  const metricLabelStyle = {
    color: '#666',
    fontSize: '0.875rem',
    fontWeight: 500,
  };

  const metricValueStyle = {
    color: '#333',
    fontSize: '1.25rem',
    fontWeight: 600,
  };

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>Total Enrolled</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.adultOutcomes.enrolled.value || 'N/A'}
            <Typography
              component="span"
              sx={{ color: '#666', fontSize: '0.875rem', ml: 1 }}
            >
              (Network Avg:{' '}
              {summaryData.adultOutcomes.enrolled.networkAverage || 'N/A'})
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>Completion Count</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.adultOutcomes.completion.value || 'N/A'}
            <Typography
              component="span"
              sx={{ color: '#666', fontSize: '0.875rem', ml: 1 }}
            >
              (Network Avg:{' '}
              {summaryData.adultOutcomes.completion.networkAverage || 'N/A'})
            </Typography>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>Job Placements</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.adultOutcomes.jobPlacement.value || 'N/A'}
            <Typography
              component="span"
              sx={{ color: '#666', fontSize: '0.875rem', ml: 1 }}
            >
              (Network Avg:{' '}
              {summaryData.adultOutcomes.jobPlacement.networkAverage || 'N/A'})
            </Typography>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

function YouthMetricSummary({ summaryData }: MetricSummaryProps) {
  const metricCardStyle = {
    p: 2,
    borderRadius: 1,
    bgcolor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  };

  const metricLabelStyle = {
    color: '#666',
    fontSize: '0.875rem',
    fontWeight: 500,
  };

  const metricValueStyle = {
    color: '#333',
    fontSize: '1.25rem',
    fontWeight: 600,
  };

  const networkAvgStyle = {
    color: '#666',
    fontSize: '0.875rem',
  };

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>Youth Enrolled</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.youthOutcomes.enrolled.value || 'N/A'}
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network Avg:{' '}
            {summaryData.youthOutcomes.enrolled.networkAverage || 'N/A'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>24-Month Completion</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.youthOutcomes.completed.count.value || 'N/A'}
            <Typography
              component="span"
              sx={{ color: '#666', fontSize: '0.875rem', ml: 1 }}
            >
              ({summaryData.youthOutcomes.completed.percentage.value || 'N/A'}%
              of enrolled)
            </Typography>
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network:{' '}
            {summaryData.youthOutcomes.completed.count.networkAverage || 'N/A'}(
            {summaryData.youthOutcomes.completed.percentage.networkAverage ||
              'N/A'}
            % of enrolled)
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={metricCardStyle}>
          <Typography sx={metricLabelStyle}>Youth Positive Outcomes</Typography>
          <Typography sx={metricValueStyle}>
            {summaryData.youthOutcomes.positiveOutcomes.value || 'N/A'}
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network Avg:{' '}
            {summaryData.youthOutcomes.positiveOutcomes.networkAverage || 'N/A'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// Add this new interface for adult summary data
interface AdultSummaryData {
  enrolled: number | null;
  graduated: number | null;
  jobPlacement: number | null;
  averageWage: number | null;
  retention: {
    threeMonth: number | null;
    sixMonth: number | null;
    twelveMonth: number | null;
  };
}

// Update the AdultSummaryBox component
function AdultSummaryBox({
  programData,
  networkAverages,
}: {
  programData: ProgramData | null;
  networkAverages: { [key: string]: number | null };
}) {
  const boxStyle = {
    p: 2,
    borderRadius: 1,
    bgcolor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  };

  const titleStyle = {
    color: '#666',
    fontSize: '0.875rem',
    fontWeight: 500,
  };

  const valueStyle = {
    color: '#333',
    fontSize: '1.25rem',
    fontWeight: 600,
  };

  const networkAvgStyle = {
    color: '#666',
    fontSize: '0.875rem',
  };

  if (!programData) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Adults Enrolled</Typography>
          <Typography sx={valueStyle}>
            {programData.adultsTrained || 'N/A'}
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network Avg: {networkAverages.adultsTrained || 'N/A'}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>Initial Wage</Typography>
          <Typography sx={valueStyle}>
            {programData.adultWage
              ? `$${programData.adultWage.toFixed(2)}/hr`
              : 'N/A'}
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network Avg:{' '}
            {networkAverages.adultWage
              ? `$${networkAverages.adultWage.toFixed(2)}/hr`
              : 'N/A'}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={boxStyle}>
          <Typography sx={titleStyle}>12-Month Wage</Typography>
          <Typography sx={valueStyle}>
            {programData.adultWageAtTwelveMonths
              ? `$${programData.adultWageAtTwelveMonths.toFixed(2)}/hr`
              : 'N/A'}
          </Typography>
          <Typography sx={networkAvgStyle}>
            Network Avg:{' '}
            {networkAverages.adultWageAtTwelveMonths
              ? `$${networkAverages.adultWageAtTwelveMonths.toFixed(2)}/hr`
              : 'N/A'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

// Move line chart options outside the render function
const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 5,
        callback: (value) => `${value}%`,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

// Update the retentionColors constant
const retentionColors = {
  org: {
    threeMonth: 'rgb(188, 108, 98)', // Muted red
    sixMonth: 'rgb(204, 197, 143)', // Muted yellow
    twelveMonth: 'rgb(128, 153, 128)', // Muted green
    twentyFourMonth: 'rgb(98, 148, 188)', // Muted blue
  },
  network: {
    threeMonth: chartColors.network, // Standard gray
    sixMonth: chartColors.network, // Standard gray
    twelveMonth: chartColors.network, // Standard gray
    twentyFourMonth: chartColors.network, // Standard gray
  },
};

// Add interface for organization data
interface OrganizationInfo {
  _id: string;
  organizationName: string;
  status: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

// Move this before renderAdultOutcomesTab
const handleLegendClick = (
  e: any,
  legendItem: { datasetIndex?: number; hidden?: boolean; text: string },
  legend: { chart: any },
) => {
  const index = legendItem.datasetIndex;
  if (
    index === undefined ||
    legendItem.text === 'Organization (months)' ||
    legendItem.text === 'Network Averages (months)' ||
    legendItem.text === '          '
  ) {
    return;
  }

  const ci = legend.chart;
  if (ci.isDatasetVisible(index)) {
    ci.hide(index);
  } else {
    ci.show(index);
  }
};

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
  const [networkAverages, setNetworkAverages] = useState<{
    [key: string]: number | null;
  }>({});
  const [historicalData, setHistoricalData] =
    useState<AdultHistoricalData | null>(null);
  const [youthHistoricalData, setYouthHistoricalData] =
    useState<YouthHistoricalData | null>(null);
  const [organizationInfo, setOrganizationInfo] =
    useState<OrganizationInfo | null>(null);

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

  // Add new function to fetch all network averages at once
  const fetchAllNetworkAverages = async (selectedYear: number) => {
    console.log('Fetching network averages for year:', selectedYear);

    const fields = [
      // Barriers
      'barrierReturningCitizensOrFormerlyIncarceratedPersons',
      'barrierPhysicalDisability',
      'barrierIntellectualOrDevelopmentalDisability',
      'barrierUnhoused',
      'barrierMentalHealth',
      'barrierNewAmericans',
      'barrierInRecovery',
      'barrierVeteran',
      // Demographics - Gender
      'traineePercentFemale',
      'traineePercentMale',
      'traineePercentNonBinary',
      'traineePercentTransgender',
      // Demographics - Race
      'traineePercentAmericanIndian',
      'traineePercentAsianOrAsianAmerican',
      'traineePercentBlackOrAfricanAmerican',
      'traineePercentLatinaLatinoLatinx',
      'traineePercentNativeHawaiianPacificIslander',
      'traineeMultiracial',
      'traineeWhite',
      'traineeOtherRace',
      'traineeRaceUnknown',
      // Adult Outcomes
      'adultsTrained',
      'adultsGraduated',
      'adultJobPlacement',
      'adultJobRetentionSixMonths',
      'adultJobRetentionTwelveMonths',
      'adultJobRetentionTwentyFourMonths',
      // Youth Outcomes
      'youthTrained',
      'youthProgramRetentionRate',
      'youthPositiveOutcomes',
      'youthJobRetentionThreeMonths',
      'youthJobRetentionSixMonths',
      'youthJobRetentionTwelveMonths',
      'youthJobRetentionTwentyFourMonths',
    ];

    const averages: { [key: string]: number | null } = {};

    await Promise.all(
      fields.map(async (field) => {
        try {
          const response = await getData(
            `program_outcomes/network-average/${field}/${selectedYear}`,
          );
          averages[field] = response.data.average;
        } catch (error) {
          console.error(`Error fetching network average for ${field}:`, error);
          averages[field] = null;
        }
      }),
    );

    console.log('Fetched network averages:', averages);
    setNetworkAverages(averages);
    return averages;
  };

  // Modify the useEffect that handles year changes to fetch network averages
  useEffect(() => {
    if (year) {
      fetchAllNetworkAverages(Number(year));
    }
  }, [year]);

  // Update fetchSummaryData to use stored network averages instead of fetching
  const fetchSummaryData = useCallback(() => {
    console.log('Network Averages:', {
      sixMonth: networkAverages?.youthJobRetentionSixMonths,
      twelveMonth: networkAverages?.youthJobRetentionTwelveMonths,
      twentyFourMonth: networkAverages?.youthJobRetentionTwentyFourMonths,
    });

    console.log('Creating summary data');
    if (!programData || !networkAverages) return;

    // Helper function to convert undefined to null and ensure number type
    const toNullableNumber = (value: number | undefined): number | null => {
      return value === undefined ? null : value;
    };

    // Helper function to calculate retention count
    const calculateRetentionCount = (
      total: number | undefined,
      retentionRate: number | undefined,
    ): number | null => {
      if (!total || !retentionRate) return null;
      return Math.round((retentionRate / 100) * total);
    };

    // Calculate youth metrics
    const youthEnrolled = toNullableNumber(programData.youthTrained);
    const youthRetentionCount = calculateRetentionCount(
      programData.youthTrained,
      programData.youthJobRetentionTwentyFourMonths,
    );

    // Calculate network averages
    const networkYouthEnrolled = networkAverages.youthTrained;
    const networkRetentionCount =
      networkAverages.youthTrained &&
      networkAverages.youthJobRetentionTwentyFourMonths
        ? calculateRetentionCount(
            networkAverages.youthTrained,
            networkAverages.youthJobRetentionTwentyFourMonths,
          )
        : null;

    const summary: SummaryData = {
      barriers: {
        returningCitizens: {
          value: toNullableNumber(
            programData.barrierReturningCitizensOrFormerlyIncarceratedPersons,
          ),
          networkAverage:
            networkAverages.barrierReturningCitizensOrFormerlyIncarceratedPersons,
        },
        physicalDisability: {
          value: toNullableNumber(programData.barrierPhysicalDisability),
          networkAverage: networkAverages.barrierPhysicalDisability,
        },
        intellectualDisability: {
          value: toNullableNumber(
            programData.barrierIntellectualOrDevelopmentalDisability,
          ),
          networkAverage:
            networkAverages.barrierIntellectualOrDevelopmentalDisability,
        },
        unhoused: {
          value: toNullableNumber(programData.barrierUnhoused),
          networkAverage: networkAverages.barrierUnhoused,
        },
        mentalHealth: {
          value: toNullableNumber(programData.barrierMentalHealth),
          networkAverage: networkAverages.barrierMentalHealth,
        },
        newAmericans: {
          value: toNullableNumber(programData.barrierNewAmericans),
          networkAverage: networkAverages.barrierNewAmericans,
        },
        inRecovery: {
          value: toNullableNumber(programData.barrierInRecovery),
          networkAverage: networkAverages.barrierInRecovery,
        },
        veteran: {
          value: toNullableNumber(programData.barrierVeteran),
          networkAverage: networkAverages.barrierVeteran,
        },
      },
      demographics: {
        gender: {
          female: {
            value: toNullableNumber(programData.traineePercentFemale),
            networkAverage: networkAverages.traineePercentFemale,
          },
          male: {
            value: toNullableNumber(programData.traineePercentMale),
            networkAverage: networkAverages.traineePercentMale,
          },
          nonBinary: {
            value: toNullableNumber(programData.traineePercentNonBinary),
            networkAverage: networkAverages.traineePercentNonBinary,
          },
          transgender: {
            value: toNullableNumber(programData.traineePercentTransgender),
            networkAverage: networkAverages.traineePercentTransgender,
          },
        },
        race: {
          americanIndian: {
            value: toNullableNumber(programData.traineePercentAmericanIndian),
            networkAverage: networkAverages.traineePercentAmericanIndian,
          },
          asian: {
            value: toNullableNumber(
              programData.traineePercentAsianOrAsianAmerican,
            ),
            networkAverage: networkAverages.traineePercentAsianOrAsianAmerican,
          },
          black: {
            value: toNullableNumber(
              programData.traineePercentBlackOrAfricanAmerican,
            ),
            networkAverage:
              networkAverages.traineePercentBlackOrAfricanAmerican,
          },
          latino: {
            value: toNullableNumber(
              programData.traineePercentLatinaLatinoLatinx,
            ),
            networkAverage: networkAverages.traineePercentLatinaLatinoLatinx,
          },
          pacificIslander: {
            value: toNullableNumber(
              programData.traineePercentNativeHawaiianPacificIslander,
            ),
            networkAverage:
              networkAverages.traineePercentNativeHawaiianPacificIslander,
          },
          multiracial: {
            value: toNullableNumber(programData.traineeMultiracial),
            networkAverage: networkAverages.traineeMultiracial,
          },
          white: {
            value: toNullableNumber(programData.traineeWhite),
            networkAverage: networkAverages.traineeWhite,
          },
          other: {
            value: toNullableNumber(programData.traineeOtherRace),
            networkAverage: networkAverages.traineeOtherRace,
          },
          unknown: {
            value: toNullableNumber(programData.traineeRaceUnknown),
            networkAverage: networkAverages.traineeRaceUnknown,
          },
        },
      },
      adultOutcomes: {
        enrolled: {
          value: toNullableNumber(programData.adultsTrained),
          networkAverage: networkAverages.adultsTrained,
        },
        completion: {
          value: toNullableNumber(programData.adultsGraduated),
          networkAverage: networkAverages.adultsGraduated,
        },
        jobPlacement: {
          value: toNullableNumber(programData.adultJobPlacement),
          networkAverage: networkAverages.adultJobPlacement,
        },
        retention3Months: {
          value: toNullableNumber(programData.adultJobRetentionThreeMonths),
          networkAverage: networkAverages.adultJobRetentionThreeMonths,
        },
        retention6Months: {
          value: toNullableNumber(programData.adultJobRetentionSixMonths),
          networkAverage: networkAverages.adultJobRetentionSixMonths,
        },
        retention12Months: {
          value: toNullableNumber(programData.adultJobRetentionTwelveMonths),
          networkAverage: networkAverages.adultJobRetentionTwelveMonths,
        },
        retention24Months: {
          value: toNullableNumber(
            programData.adultJobRetentionTwentyFourMonths,
          ),
          networkAverage: networkAverages.adultJobRetentionTwentyFourMonths,
        },
      },
      youthOutcomes: {
        enrolled: {
          value: youthEnrolled,
          networkAverage: networkYouthEnrolled,
        },
        completed: {
          count: {
            value: youthRetentionCount,
            networkAverage: networkRetentionCount,
          },
          percentage: {
            value: toNullableNumber(
              programData.youthJobRetentionTwentyFourMonths,
            ),
            networkAverage: networkAverages.youthJobRetentionTwentyFourMonths,
          },
        },
        positiveOutcomes: {
          value: toNullableNumber(programData.youthPositiveOutcomes),
          networkAverage: networkAverages.youthPositiveOutcomes,
        },
      },
    };

    setSummaryData(summary);
  }, [programData, networkAverages]);

  // Update the useEffect for summary data
  useEffect(() => {
    if (programData && networkAverages) {
      fetchSummaryData();
    }
  }, [programData, networkAverages, fetchSummaryData]);

  // Add this helper function inside the component
  const createComparisonData = (data: NetworkComparison[]) => {
    return {
      labels: data.map((_, index) => `Metric ${index + 1}`),
      datasets: [
        {
          label: 'Organization',
          data: data.map((d) => d.value),
          backgroundColor: 'rgba(53, 162, 235, 0.8)',
        },
        {
          label: 'Network Average',
          data: data.map((d) => d.networkAverage),
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
      ],
    };
  };

  // Add this helper function at the component level
  const calculateUnknownPercentage = (
    values: (number | null)[],
  ): number | null => {
    const validValues = values.filter((v): v is number => v !== null);
    if (validValues.length === 0) return null;
    const sum = validValues.reduce((acc, val) => acc + val, 0);
    return Math.max(0, 100 - sum);
  };

  // Update the determineScaleMax function to be more dynamic
  const determineScaleMax = (
    datasets: { data: (number | null)[] }[],
  ): number => {
    const allValues = datasets.flatMap((dataset) =>
      dataset.data.filter((v): v is number => v !== null),
    );
    if (allValues.length === 0) return 100;

    const maxValue = Math.max(...allValues);
    // Add 10% padding to the max value
    return Math.ceil(maxValue * 1.1);
  };

  // Update the createBarOptions function to handle optional scales
  const createBarOptions = (data: {
    datasets: { data: (number | null)[] }[];
  }): ChartOptions<'bar'> => {
    const maxScale = determineScaleMax(data.datasets);
    // Round up maxScale to next multiple of 5
    const roundedMaxScale = Math.ceil(maxScale / 5) * 5;

    const options: ChartOptions<'bar'> = {
      ...baseBarOptions,
      scales: {
        x: {
          type: 'linear',
          beginAtZero: true,
          max: roundedMaxScale,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            display: true,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            borderDash: [],
            borderDashOffset: 0,
            lineWidth: 1,
            tickBorderDash: [],
            tickBorderDashOffset: 0,
            tickLength: 8,
            tickWidth: 1,
            z: 0,
          },
          ticks: {
            color: '#666',
            callback(this: Scale<CoreScaleOptions>, tickValue: number | string) {
              return `${Math.round(Number(tickValue))}%`;
            },
            font: { size: 11 },
            padding: 4,
            stepSize: 5,
          },
        },
        y: {
          type: 'category',
          grid: {
            display: false,
          },
          ticks: {
            color: '#666',
            font: { size: 11 },
            padding: 4,
          },
        },
      },
    };

    return options;
  };

  // Update the renderSummaryTab function
  const renderSummaryTab = () => {
    if (!summaryData) {
      return <Typography>Loading summary data...</Typography>;
    }

    // Create barriers data
    const barriersDataRaw = {
      labels: [
        'Returning Citizens',
        'Physical Disability',
        'Intellectual Disability',
        'Unhoused',
        'Mental Health',
        'New Americans',
        'In Recovery',
        'Veteran',
      ],
      datasets: [
        {
          label: 'Organization',
          data: [
            summaryData.barriers.returningCitizens.value,
            summaryData.barriers.physicalDisability.value,
            summaryData.barriers.intellectualDisability.value,
            summaryData.barriers.unhoused.value,
            summaryData.barriers.mentalHealth.value,
            summaryData.barriers.newAmericans.value,
            summaryData.barriers.inRecovery.value,
            summaryData.barriers.veteran.value,
          ],
          backgroundColor: chartColors.org,
          borderRadius: 4,
        },
        {
          label: 'Network Average',
          data: [
            summaryData.barriers.returningCitizens.networkAverage,
            summaryData.barriers.physicalDisability.networkAverage,
            summaryData.barriers.intellectualDisability.networkAverage,
            summaryData.barriers.unhoused.networkAverage,
            summaryData.barriers.mentalHealth.networkAverage,
            summaryData.barriers.newAmericans.networkAverage,
            summaryData.barriers.inRecovery.networkAverage,
            summaryData.barriers.veteran.networkAverage,
          ],
          backgroundColor: chartColors.network,
          borderRadius: 4,
        },
      ],
    };

    // Create gender data
    const genderDataRaw = {
      labels: ['Female', 'Male', 'Non-Binary', 'Transgender', 'Unknown'],
      datasets: [
        {
          label: 'Organization',
          data: [
            summaryData.demographics.gender.female.value,
            summaryData.demographics.gender.male.value,
            summaryData.demographics.gender.nonBinary.value,
            summaryData.demographics.gender.transgender.value,
            calculateUnknownPercentage([
              summaryData.demographics.gender.female.value,
              summaryData.demographics.gender.male.value,
              summaryData.demographics.gender.nonBinary.value,
              summaryData.demographics.gender.transgender.value,
            ]),
          ],
          backgroundColor: chartColors.org,
          borderRadius: 4,
        },
        {
          label: 'Network Average',
          data: [
            summaryData.demographics.gender.female.networkAverage,
            summaryData.demographics.gender.male.networkAverage,
            summaryData.demographics.gender.nonBinary.networkAverage,
            summaryData.demographics.gender.transgender.networkAverage,
            calculateUnknownPercentage([
              summaryData.demographics.gender.female.networkAverage,
              summaryData.demographics.gender.male.networkAverage,
              summaryData.demographics.gender.nonBinary.networkAverage,
              summaryData.demographics.gender.transgender.networkAverage,
            ]),
          ],
          backgroundColor: chartColors.network,
          borderRadius: 4,
        },
      ],
    };

    // Create race data
    const raceDataRaw = {
      labels: [
        'American Indian',
        'Asian',
        'Black',
        'Latino',
        'Pacific Islander',
        'Multiracial',
        'White',
        'Other',
        'Unknown',
      ],
      datasets: [
        {
          label: 'Organization',
          data: [
            summaryData.demographics.race.americanIndian.value,
            summaryData.demographics.race.asian.value,
            summaryData.demographics.race.black.value,
            summaryData.demographics.race.latino.value,
            summaryData.demographics.race.pacificIslander.value,
            summaryData.demographics.race.multiracial.value,
            summaryData.demographics.race.white.value,
            summaryData.demographics.race.other.value,
            calculateUnknownPercentage([
              summaryData.demographics.race.americanIndian.value,
              summaryData.demographics.race.asian.value,
              summaryData.demographics.race.black.value,
              summaryData.demographics.race.latino.value,
              summaryData.demographics.race.pacificIslander.value,
              summaryData.demographics.race.multiracial.value,
              summaryData.demographics.race.white.value,
              summaryData.demographics.race.other.value,
            ]),
          ],
          backgroundColor: chartColors.org,
          borderRadius: 4,
        },
        {
          label: 'Network Average',
          data: [
            summaryData.demographics.race.americanIndian.networkAverage,
            summaryData.demographics.race.asian.networkAverage,
            summaryData.demographics.race.black.networkAverage,
            summaryData.demographics.race.latino.networkAverage,
            summaryData.demographics.race.pacificIslander.networkAverage,
            summaryData.demographics.race.multiracial.networkAverage,
            summaryData.demographics.race.white.networkAverage,
            summaryData.demographics.race.other.networkAverage,
            calculateUnknownPercentage([
              summaryData.demographics.race.americanIndian.networkAverage,
              summaryData.demographics.race.asian.networkAverage,
              summaryData.demographics.race.black.networkAverage,
              summaryData.demographics.race.latino.networkAverage,
              summaryData.demographics.race.pacificIslander.networkAverage,
              summaryData.demographics.race.multiracial.networkAverage,
              summaryData.demographics.race.white.networkAverage,
              summaryData.demographics.race.other.networkAverage,
            ]),
          ],
          backgroundColor: chartColors.network,
          borderRadius: 4,
        },
      ],
    };

    // Create retention data
    const adultRetentionData = {
      labels: ['6 Months', '12 Months', '24 Months'],
      datasets: [
        {
          label: 'Organization',
          data: [
            summaryData.adultOutcomes.retention6Months.value,
            summaryData.adultOutcomes.retention12Months.value,
            summaryData.adultOutcomes.retention24Months.value,
          ],
          backgroundColor: chartColors.org,
          borderRadius: 4,
        },
        {
          label: 'Network Average',
          data: [
            summaryData.adultOutcomes.retention6Months.networkAverage,
            summaryData.adultOutcomes.retention12Months.networkAverage,
            summaryData.adultOutcomes.retention24Months.networkAverage,
          ],
          backgroundColor: chartColors.network,
          borderRadius: 4,
        },
      ],
    };

    const youthRetentionData = {
      labels: ['6 Months', '12 Months', '24 Months'],
      datasets: [
        {
          label: 'Organization',
          data: programData
            ? [
                programData.youthJobRetentionSixMonths ?? null,
                programData.youthJobRetentionTwelveMonths ?? null,
                programData.youthJobRetentionTwentyFourMonths ?? null,
              ]
            : [null, null, null],
          backgroundColor: chartColors.org,
          borderRadius: 4,
        },
        {
          label: 'Network Average',
          data: [
            networkAverages?.youthJobRetentionSixMonths ?? null,
            networkAverages?.youthJobRetentionTwelveMonths ?? null,
            networkAverages?.youthJobRetentionTwentyFourMonths ?? null,
          ],
          backgroundColor: chartColors.network,
          borderRadius: 4,
        },
      ],
    };

    console.log('Youth Retention Data:', {
      organizationValues: youthRetentionData.datasets[0].data,
      networkAverages: youthRetentionData.datasets[1].data,
      rawNetworkAverages: {
        sixMonth: networkAverages?.youthJobRetentionSixMonths,
        twelveMonth: networkAverages?.youthJobRetentionTwelveMonths,
        twentyFourMonth: networkAverages?.youthJobRetentionTwentyFourMonths,
      },
    });

    return (
      <Grid container spacing={3}>
        {/* Barriers section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Barriers
            </Typography>
            <Box sx={{ height: 400 }}>
              <Bar
                options={createBarOptions(barriersDataRaw)}
                data={barriersDataRaw}
              />
            </Box>
          </Card>
        </Grid>

        {/* Demographics sections */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gender Demographics
            </Typography>
            <Box sx={{ height: 400 }}>
              <Bar
                options={createBarOptions(genderDataRaw)}
                data={genderDataRaw}
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Race Demographics
            </Typography>
            <Box sx={{ height: 400 }}>
              <Bar options={createBarOptions(raceDataRaw)} data={raceDataRaw} />
            </Box>
          </Card>
        </Grid>

        {/* Adult outcomes section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Adult Program Outcomes
            </Typography>
            <AdultMetricSummary summaryData={summaryData} />
            <Box sx={{ height: 400 }}>
              <Bar
                options={{
                  ...createBarOptions(adultRetentionData),
                  scales: {
                    x: createBarOptions(adultRetentionData).scales?.x ?? {},
                    y: {
                      ...(createBarOptions(adultRetentionData).scales?.y ?? {}),
                      title: {
                        display: true,
                        text: 'Adult Job Retention',
                        color: '#666',
                        font: {
                          size: 12,
                        },
                        padding: 4,
                      },
                    },
                  },
                }}
                data={adultRetentionData}
              />
            </Box>
          </Card>
        </Grid>

        {/* Youth outcomes section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Youth Program Outcomes
            </Typography>
            <YouthMetricSummary summaryData={summaryData} />
            <Box sx={{ height: 400 }}>
              <Bar
                options={{
                  ...createBarOptions(youthRetentionData),
                  scales: {
                    x: {
                      ...(createBarOptions(youthRetentionData).scales?.x ?? {}),
                    },
                    y: {
                      ...(createBarOptions(youthRetentionData).scales?.y ?? {}),
                      title: {
                        display: true,
                        text: 'Youth Job Retention',
                        color: '#666',
                        font: {
                          size: 12,
                        },
                        padding: 4,
                      },
                    },
                  },
                }}
                data={youthRetentionData}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Add new interfaces for the historical data
  interface TimeSeriesData {
    years: number[];
    orgValues: (number | null)[];
    networkValues: (number | null)[];
  }

  interface AdultHistoricalData {
    completionRate: TimeSeriesData;
    placementRate: TimeSeriesData;
    retention: {
      threeMonth: TimeSeriesData;
      sixMonth: TimeSeriesData;
      twelveMonth: TimeSeriesData;
      twentyFourMonth: TimeSeriesData;
    };
    wages: {
      initial: TimeSeriesData;
      twelveMonth: TimeSeriesData;
    };
  }

  // Add function to fetch historical data for a specific field
  const fetchFieldHistory = async (selectedOrgId: string, field: string) => {
    console.log(`Fetching field history for ${field}:`, { selectedOrgId });
    
    const fieldValuesResponse = await getData(
      `program_outcomes/field-values/${selectedOrgId}/${field}`,
    );
    console.log(`Field values response for ${field}:`, fieldValuesResponse.data);
    
    const yearValues = fieldValuesResponse.data;
    const yearsList = Object.keys(yearValues).map(Number);
    
    console.log(`Fetching network averages for ${field}:`, { yearsList });
    const networkAverageResults = await Promise.all(
      yearsList.map(async (yearNum) => {
        const networkResponse = await getData(`program_outcomes/network-average/${field}/${yearNum}`);
        console.log(`Network average for ${field} in ${yearNum}:`, networkResponse.data);
        return networkResponse;
      }),
    );

    const result = {
      years: yearsList,
      orgValues: yearsList.map((yearNum) => yearValues[yearNum]),
      networkValues: networkAverageResults.map((res) => res.data.average),
    };
    
    console.log(`Final data for ${field}:`, result);
    return result;
  };

  // Update the fetchHistoricalData effect
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!orgId) return;

      const [
        completionRate,
        placementRate,
        threeMonth,
        sixMonth,
        twelveMonth,
        twentyFourMonth,
        initialWage, // Add initial wage
        twelveMonthWage, // Add 12-month wage
      ] = await Promise.all([
        fetchFieldHistory(orgId, 'adultsGraduated'),
        fetchFieldHistory(orgId, 'adultJobPlacement'),
        fetchFieldHistory(orgId, 'adultJobRetentionThreeMonths'),
        fetchFieldHistory(orgId, 'adultJobRetentionSixMonths'),
        fetchFieldHistory(orgId, 'adultJobRetentionTwelveMonths'),
        fetchFieldHistory(orgId, 'adultJobRetentionTwentyFourMonths'),
        fetchFieldHistory(orgId, 'adultWage'), // Add this line
        fetchFieldHistory(orgId, 'adultWageAtTwelveMonths'), // Add this line
      ]);

      setHistoricalData({
        completionRate,
        placementRate,
        retention: {
          threeMonth,
          sixMonth,
          twelveMonth,
          twentyFourMonth,
        },
        wages: {
          // Add wages section
          initial: initialWage,
          twelveMonth: twelveMonthWage,
        },
      });
    };

    fetchHistoricalData();
  }, [orgId]);

  // Add effect to fetch organization info when orgId changes
  useEffect(() => {
    const fetchOrganizationInfo = async () => {
      if (!orgId) return;

      try {
        const response = await getData(`organization/id/${orgId}`);
        setOrganizationInfo(response.data);
      } catch (error) {
        console.error('Error fetching organization info:', error);
      }
    };

    fetchOrganizationInfo();
  }, [orgId]);

  // Add renderOrganizationInfoTab function
  const renderOrganizationInfoTab = () => {
    if (!organizationInfo) {
      return <Typography>Loading organization information...</Typography>;
    }

    return (
      <Card sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {organizationInfo.organizationName}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Organization Status
            </Typography>
            <Typography variant="body1">{organizationInfo.status}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1">{organizationInfo.street}</Typography>
            <Typography variant="body1">
              {`${organizationInfo.city}, ${organizationInfo.state} ${organizationInfo.zip}`}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  };

  // Now renderAdultOutcomesTab can use handleLegendClick
  const renderAdultOutcomesTab = () => {
    if (!programData || !historicalData) {
      return <Typography>Loading adult outcomes data...</Typography>;
    }

    return (
      <Grid container spacing={3}>
        {/* Summary Box */}
        <Grid item xs={12}>
          <AdultSummaryBox
            programData={programData}
            networkAverages={networkAverages}
          />
        </Grid>

        {/* Program Completion Rate Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Program Completion Rate Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={{
                  ...lineChartOptions,
                  plugins: {
                    ...lineChartOptions.plugins,
                    legend: {
                      position: 'bottom',
                      labels: {
                        sort: (a, b) => {
                          // Sort organization metrics first, then network averages
                          const isANetwork = a.text.includes('Network');
                          const isBNetwork = b.text.includes('Network');
                          if (isANetwork && !isBNetwork) return 1;
                          if (!isANetwork && isBNetwork) return -1;
                          return 0;
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: historicalData.completionRate.years,
                  datasets: [
                    {
                      label: 'Organization',
                      data: historicalData.completionRate.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: 'Network Average',
                      data: historicalData.completionRate.networkValues,
                      borderColor: chartColors.network,
                      backgroundColor: chartColors.network,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Job Placement Rate Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Job Placement Rate Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={{
                  ...lineChartOptions,
                  plugins: {
                    ...lineChartOptions.plugins,
                    legend: {
                      position: 'bottom',
                      labels: {
                        sort: (a, b) => {
                          // Sort organization metrics first, then network averages
                          const isANetwork = a.text.includes('Network');
                          const isBNetwork = b.text.includes('Network');
                          if (isANetwork && !isBNetwork) return 1;
                          if (!isANetwork && isBNetwork) return -1;
                          return 0;
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: historicalData.placementRate.years,
                  datasets: [
                    {
                      label: 'Organization',
                      data: historicalData.placementRate.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: 'Network Average',
                      data: historicalData.placementRate.networkValues,
                      borderColor: chartColors.network,
                      backgroundColor: chartColors.network,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Job Retention Rates - Split into 4 charts */}
        <Grid container item xs={12} spacing={3}>
          {/* 3-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                3-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: historicalData.retention.threeMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: historicalData.retention.threeMonth.orgValues,
                        borderColor: retentionColors.org.threeMonth,
                        backgroundColor: retentionColors.org.threeMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: historicalData.retention.threeMonth.networkValues,
                        borderColor: retentionColors.network.threeMonth,
                        backgroundColor: retentionColors.network.threeMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 6-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                6-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: historicalData.retention.sixMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: historicalData.retention.sixMonth.orgValues,
                        borderColor: retentionColors.org.sixMonth,
                        backgroundColor: retentionColors.org.sixMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: historicalData.retention.sixMonth.networkValues,
                        borderColor: retentionColors.network.sixMonth,
                        backgroundColor: retentionColors.network.sixMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 12-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                12-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: historicalData.retention.twelveMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: historicalData.retention.twelveMonth
                          .orgValues,
                        borderColor: retentionColors.org.twelveMonth,
                        backgroundColor: retentionColors.org.twelveMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: historicalData.retention.twelveMonth
                          .networkValues,
                        borderColor: retentionColors.network.twelveMonth,
                        backgroundColor: retentionColors.network.twelveMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 24-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                24-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: historicalData.retention.twentyFourMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: historicalData.retention.twentyFourMonth
                          .orgValues,
                        borderColor: retentionColors.org.twentyFourMonth,
                        backgroundColor: retentionColors.org.twentyFourMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: historicalData.retention.twentyFourMonth
                          .networkValues,
                        borderColor: retentionColors.network.twentyFourMonth,
                        backgroundColor:
                          retentionColors.network.twentyFourMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Wages Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Wages Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={{
                  ...lineChartOptions,
                  plugins: {
                    ...lineChartOptions.plugins,
                    legend: {
                      position: 'bottom',
                      labels: {
                        sort: (a, b) => {
                          // Sort organization metrics first, then network averages
                          const isANetwork = a.text.includes('Network');
                          const isBNetwork = b.text.includes('Network');
                          if (isANetwork && !isBNetwork) return 1;
                          if (!isANetwork && isBNetwork) return -1;
                          return 0;
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: historicalData.wages.initial.years,
                  datasets: [
                    {
                      label: 'Initial Wage',
                      data: historicalData.wages.initial.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: '12-Month Wage',
                      data: historicalData.wages.twelveMonth.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    );
  };

  // Update the youthRetentionColors constant
  const youthRetentionColors = {
    org: {
      threeMonth: 'rgb(188, 108, 98)',   // Muted red
      sixMonth: 'rgb(204, 197, 143)',    // Muted yellow
      twelveMonth: 'rgb(128, 153, 128)', // Muted green
      twentyFourMonth: 'rgb(98, 148, 188)', // Muted blue
    },
    network: {
      threeMonth: chartColors.network,    // Standard gray
      sixMonth: chartColors.network,      // Standard gray
      twelveMonth: chartColors.network,   // Standard gray
      twentyFourMonth: chartColors.network, // Standard gray
    }
  };

  // Add the YouthHistoricalData interface
  interface YouthHistoricalData {
    completionRate: TimeSeriesData;
    placementRate: TimeSeriesData;
    retention: {
      threeMonth: TimeSeriesData;
      sixMonth: TimeSeriesData;
      twelveMonth: TimeSeriesData;
      twentyFourMonth: TimeSeriesData;  // Add this line
    };
    positiveOutcomes: TimeSeriesData;
  }

  // Update the fetchYouthHistoricalData function to properly fetch network averages
  useEffect(() => {
    const fetchYouthHistoricalData = async () => {
      if (!orgId) return;

      try {
        console.log('Fetching youth historical data for orgId:', orgId);

        const [
          completionRate,
          placementRate,
          threeMonth,
          sixMonth,
          twelveMonth,
          twentyFourMonth,  // Add this line
          positiveOutcomes,
        ] = await Promise.all([
          fetchFieldHistory(orgId, 'youthProgramRetentionRate'),
          fetchFieldHistory(orgId, 'youthPositiveOutcomes'),
          fetchFieldHistory(orgId, 'youthJobRetentionThreeMonths'),
          fetchFieldHistory(orgId, 'youthJobRetentionSixMonths'),
          fetchFieldHistory(orgId, 'youthJobRetentionTwelveMonths'),
          fetchFieldHistory(orgId, 'youthJobRetentionTwentyFourMonths'),  // Add this line
          fetchFieldHistory(orgId, 'youthPositiveOutcomes'),
        ]);

        // Add debug logging
        console.log('Youth Historical Data:', {
          retention: {
            twentyFourMonth: {
              orgValues: twentyFourMonth.orgValues,
              networkValues: twentyFourMonth.networkValues
            }
          }
        });

        setYouthHistoricalData({
          completionRate,
          placementRate,
          retention: {
            threeMonth,
            sixMonth,
            twelveMonth,
            twentyFourMonth,  // Add this line
          },
          positiveOutcomes,
        });
      } catch (error) {
        console.error('Error in fetchYouthHistoricalData:', error);
      }
    };

    fetchYouthHistoricalData();
  }, [orgId]);

  // Update the renderYouthOutcomesTab function
  const renderYouthOutcomesTab = () => {
    if (!programData || !youthHistoricalData) {
      return <Typography>Loading youth outcomes data...</Typography>;
    }

    return (
      <Grid container spacing={3}>
        {/* Program Completion Rate Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Youth Program Completion Rate Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={lineChartOptions}
                data={{
                  labels: youthHistoricalData.completionRate.years,
                  datasets: [
                    {
                      label: 'Organization',
                      data: youthHistoricalData.completionRate.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: 'Network Average',
                      data: youthHistoricalData.completionRate.networkValues,
                      borderColor: chartColors.network,
                      backgroundColor: chartColors.network,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Job Placement Rate Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Youth Job Placement Rate Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={lineChartOptions}
                data={{
                  labels: youthHistoricalData.placementRate.years,
                  datasets: [
                    {
                      label: 'Organization',
                      data: youthHistoricalData.placementRate.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: 'Network Average',
                      data: youthHistoricalData.placementRate.networkValues,
                      borderColor: chartColors.network,
                      backgroundColor: chartColors.network,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Job Retention Rates - Split into 4 charts */}
        <Grid container item xs={12} spacing={3}>
          {/* 3-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                3-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: youthHistoricalData.retention.threeMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: youthHistoricalData.retention.threeMonth.orgValues,
                        borderColor: youthRetentionColors.org.threeMonth,
                        backgroundColor: youthRetentionColors.org.threeMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: youthHistoricalData.retention.threeMonth.networkValues,
                        borderColor: youthRetentionColors.network.threeMonth,
                        backgroundColor: youthRetentionColors.network.threeMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 6-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                6-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: youthHistoricalData.retention.sixMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: youthHistoricalData.retention.sixMonth.orgValues,
                        borderColor: youthRetentionColors.org.sixMonth,
                        backgroundColor: youthRetentionColors.org.sixMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: youthHistoricalData.retention.sixMonth.networkValues,
                        borderColor: youthRetentionColors.network.sixMonth,
                        backgroundColor: youthRetentionColors.network.sixMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 12-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                12-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: youthHistoricalData.retention.twelveMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: youthHistoricalData.retention.twelveMonth.orgValues,
                        borderColor: youthRetentionColors.org.twelveMonth,
                        backgroundColor: youthRetentionColors.org.twelveMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: youthHistoricalData.retention.twelveMonth.networkValues,
                        borderColor: youthRetentionColors.network.twelveMonth,
                        backgroundColor: youthRetentionColors.network.twelveMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* 24-Month Retention */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                24-Month Job Retention Rate
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  options={lineChartOptions}
                  data={{
                    labels: youthHistoricalData.retention.twentyFourMonth.years,
                    datasets: [
                      {
                        label: 'Organization',
                        data: youthHistoricalData.retention.twentyFourMonth.orgValues,
                        borderColor: youthRetentionColors.org.twentyFourMonth,
                        backgroundColor: youthRetentionColors.org.twentyFourMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                      {
                        label: 'Network Average',
                        data: youthHistoricalData.retention.twentyFourMonth.networkValues,
                        borderColor: youthRetentionColors.network.twentyFourMonth,
                        backgroundColor: youthRetentionColors.network.twentyFourMonth,
                        pointStyle: 'circle',
                        pointRadius: 6,
                        tension: 0.1,
                      },
                    ],
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Positive Outcomes Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Youth Positive Outcomes Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                options={lineChartOptions}
                data={{
                  labels: youthHistoricalData.positiveOutcomes.years,
                  datasets: [
                    {
                      label: 'Organization',
                      data: youthHistoricalData.positiveOutcomes.orgValues,
                      borderColor: chartColors.org,
                      backgroundColor: chartColors.org,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                    {
                      label: 'Network Average',
                      data: youthHistoricalData.positiveOutcomes.networkValues,
                      borderColor: chartColors.network,
                      backgroundColor: chartColors.network,
                      pointStyle: 'circle',
                      pointRadius: 6,
                      tension: 0.1,
                    },
                  ],
                }}
              />
            </Box>
          </Card>
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
        {tabValue === 0 && renderSummaryTab()}
        {tabValue === 1 && renderAdultOutcomesTab()}
        {tabValue === 2 && renderYouthOutcomesTab()}
        {tabValue === 3 && renderOrganizationInfoTab()}
      </Box>
    </Container>
  );
}

export default ProgramOutcomesVisualization;
