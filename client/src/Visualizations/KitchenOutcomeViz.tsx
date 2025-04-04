/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  MenuItem,
  Popper,
  Slider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getData } from '../util/api';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SurveyData {
  org_id: string;
  year: Date;
  shareSurvey?: 'Yes' | 'No';
  organizationName: string;
  responderName: string;
  responderTitle: string;
  hungerReliefsMealsServed?: number;
  typeOfMealsServed?:
    | 'Childcare Meals'
    | 'School Meals'
    | 'Soup Kitchen (onsite)'
    | 'Shelter Meals (offsite)'
    | 'Meals for Supportive/Transitional Housing'
    | 'Meals For Seniors'
    | 'Medically Tailored Meals';
  costPerMeal?: number;
  foodCostPercentage?: number;
  mealReimbursement?: number;
  mealFundingPublic?: number;
  mealFundingPrivateContracts?: number;
  mealFundingPrivateDonations?: number;
  mealsFemale?: number;
  mealsMale?: number;
  mealsNonBinary?: number;
  mealsGenderUnknown?: number;
  mealsTransgender?: number;
  mealsAmericanIndian?: number;
  mealsAsian?: number;
  mealsBlack?: number;
  mealsLatinx?: number;
  mealsNativeHawaiian?: number;
  mealsMultiRacial?: number;
  mealsWhite?: number;
  mealsOtherRace?: number;
  mealsRaceUnknown?: number;
  mealsInfants?: number;
  mealsChildren?: number;
  mealsAdults?: number;
  mealsSeniors?: number;
  mealsAgeUnknown?: number;
  capitalExpansionProjects?:
    | 'We are in early stages of planning a capital expansion'
    | 'We have a capital expansion plan and are fundraising'
    | 'We have a fully funded capital expansion plan'
    | 'We have recently completed or will soon complete the project'
    | 'We have no future plans or projects underway';
  capitalProjectSize?: number;
  capitalProjectDate?: Date;
  capitalExpansionProjectNeeds?:
    | 'How do we even start?'
    | 'Planning cost expenses'
    | 'Creating fundraising strategy'
    | 'Construction costs'
    | 'Equipment (heavy or small)'
    | 'Operating expenses'
    | 'Other';
  retailSocialEnterpriseRevenue?: number;
  grossRevenueCafe?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
  grossRevenueRestaurant?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
  grossRevenueCatering?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
  grossRevenueFoodTruck?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
  grossRevenueWholesale?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
  grossRevenueFoodSubscription?:
    | 'Less than $100K'
    | '$100K to $250K'
    | '$250K to $500K'
    | '$500K to $1M'
    | 'Over $1M'
    | 'No Enterprise';
}

function KitchenOutcomesVisualization() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [networkAverages, setNetworkAverages] = useState<{
    [key: string]: number | null;
  }>({});
  type OrgVal = {
    name: string;
    id: string;
  };
  const currentYear = new Date().getFullYear();
  const [orgList, setOrgList] = useState<OrgVal[] | null>(null);
  const [yearList, setYearList] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orgName, setOrgName] = useState<string | undefined>('');
  const [orgId, setOrgId] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [mealType, setMealType] = useState<string>('All');
  const [mealRange, setMealRange] = useState<string>('All');
  const [yearRange, setYearRange] = useState<number[]>([2017, currentYear]); // Default range
  const [
    selectedModelOrganizationComparison,
    setSelectedModelOrganizationComparison,
  ] = useState(false);
  const tabNames = [
    'Hunger Relief',
    'Social Enterprise',
    'Capital Projects',
    'Organization Info',
  ];

  const mealTypes = [
    'All',
    'Childcare Meals',
    'School Meals',
    'Soup Kitchen (onsite)',
    'Shelter Meals (offsite)',
    'Meals for Supportive/Transitional Housing',
    'Meals For Seniors',
    'Medically Tailored Meals',
  ];

  const mealRanges = [
    'All',
    '0-100000',
    '100000-500000',
    '500000-1000000',
    '1000000+',
  ];

  const handleMealTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealType(event.target.value);
  };

  const handleMealRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMealRange(event.target.value);
  };

  const handleYearRangeChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
    // Trigger network average calculation with new filter
  };

  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await getData(`organization/organizations`);
        const organizationNames = response.data.map(
          (org: { organizationName: string; _id: string }) => ({
            name: org.organizationName,
            id: org._id,
          }),
        );
        setOrgList(organizationNames);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrgList();
  }, []);

  useEffect(() => {
    const fetchOutcomes = async () => {
      if (!orgId) return;
      if (!year) return;
      try {
        const response = await getData(`kitchen_outcomes/${year}/${orgId}`);
        console.log(response);
        console.log(orgId);
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOutcomes();
  }, [year, orgId]);
  useEffect(() => {
    const settingYearList = async () => {
      if (!orgId) return;
      try {
        const response = await getData(`kitchen_outcomes/get/years/${orgId}`);
        console.log('Years response:', response.data);
        setYearList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    settingYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId]);
  const handleOrgSelection = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const selectedOrg = event.target.value;
    setOrgId(selectedOrg);
    setYear('');
    setOrgName(orgList?.find((org) => org.id === selectedOrg)?.name);
  };
  const [chartData, setChartData] = useState<{
    ageData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
      }[];
    };
    raceData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
      }[];
    };
  }>({
    ageData: {
      labels: ['Infants', 'Children', 'Adults', 'Seniors', 'Unknown'],
      datasets: [
        {
          label: 'Age Distribution',
          data: [],
          backgroundColor: [
            '#7C9CB4', // Muted blue
            '#86A873', // Muted green
            '#B47C8E', // Muted rose
            '#8E8EA6', // Muted purple
            '#A8A8A8', // Muted gray
          ],
          hoverBackgroundColor: [
            '#6B8BA3', // Darker blue
            '#759662', // Darker green
            '#A36B7D', // Darker rose
            '#7D7D95', // Darker purple
            '#979797', // Darker gray
          ],
        },
      ],
    },
    raceData: {
      labels: [
        'American Indian',
        'Asian',
        'Black',
        'Latinx',
        'Native Hawaiian',
        'Multi Racial',
        'White',
        'Other',
        'Unknown',
      ],
      datasets: [
        {
          label: 'Race Distribution',
          data: [],
          backgroundColor: [
            '#D95D39', // Muted rust
            '#45B7D1', // Muted turquoise
            '#2D4654', // Dark slate
            '#98B06F', // Muted olive
            '#6B4E71', // Muted purple
            '#D98E32', // Muted orange
            '#9EA7AA', // Light gray
            '#B55A30', // Terracotta
            '#626D71', // Dark gray
          ],
          hoverBackgroundColor: [
            '#C54D29', // Darker rust
            '#35A7C1', // Darker turquoise
            '#1D3644', // Darker slate
            '#88A05F', // Darker olive
            '#5B3E61', // Darker purple
            '#C97E22', // Darker orange
            '#8E979A', // Darker light gray
            '#A54A20', // Darker terracotta
            '#525D61', // Darker gray
          ],
        },
      ],
    },
  });

  const [avgChartData, setAvgChartData] = useState<{
    ageData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
      }[];
    };
    raceData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
      }[];
    };
  }>({
    ageData: {
      labels: ['Infants', 'Children', 'Adults', 'Seniors', 'Unknown'],
      datasets: [
        {
          label: 'Age Distribution',
          data: [],
          backgroundColor: [
            '#7C9CB4', // Muted blue
            '#86A873', // Muted green
            '#B47C8E', // Muted rose
            '#8E8EA6', // Muted purple
            '#A8A8A8', // Muted gray
          ],
          hoverBackgroundColor: [
            '#6B8BA3', // Darker blue
            '#759662', // Darker green
            '#A36B7D', // Darker rose
            '#7D7D95', // Darker purple
            '#979797', // Darker gray
          ],
        },
      ],
    },
    raceData: {
      labels: [
        'American Indian',
        'Asian',
        'Black',
        'Latinx',
        'Native Hawaiian',
        'Multi Racial',
        'White',
        'Other',
        'Unknown',
      ],
      datasets: [
        {
          label: 'Race Distribution',
          data: [],
          backgroundColor: [
            '#D95D39', // Muted rust
            '#45B7D1', // Muted turquoise
            '#2D4654', // Dark slate
            '#98B06F', // Muted olive
            '#6B4E71', // Muted purple
            '#D98E32', // Muted orange
            '#9EA7AA', // Light gray
            '#B55A30', // Terracotta
            '#626D71', // Dark gray
          ],
          hoverBackgroundColor: [
            '#C54D29', // Darker rust
            '#35A7C1', // Darker turquoise
            '#1D3644', // Darker slate
            '#88A05F', // Darker olive
            '#5B3E61', // Darker purple
            '#C97E22', // Darker orange
            '#8E979A', // Darker light gray
            '#A54A20', // Darker terracotta
            '#525D61', // Darker gray
          ],
        },
      ],
    },
  });

  useEffect(() => {
    // Update chartData when surveyData changes
    if (surveyData) {
      const ageData = {
        labels: ['Infants', 'Children', 'Adults', 'Seniors', 'Unknown'],
        datasets: [
          {
            label: 'Age Distribution',
            data: [
              surveyData?.mealsInfants ?? 0,
              surveyData?.mealsChildren ?? 0,
              surveyData?.mealsAdults ?? 0,
              surveyData?.mealsSeniors ?? 0,
              surveyData?.mealsAgeUnknown ?? 0,
            ],
            backgroundColor: [
              '#7C9CB4', // Muted blue
              '#86A873', // Muted green
              '#B47C8E', // Muted rose
              '#8E8EA6', // Muted purple
              '#A8A8A8', // Muted gray
            ],
            hoverBackgroundColor: [
              '#6B8BA3', // Darker blue
              '#759662', // Darker green
              '#A36B7D', // Darker rose
              '#7D7D95', // Darker purple
              '#979797', // Darker gray
            ],
          },
        ],
      };

      const raceData = {
        labels: [
          'American Indian',
          'Asian',
          'Black',
          'Latinx',
          'Native Hawaiian',
          'Multi Racial',
          'White',
          'Other',
          'Unknown',
        ],
        datasets: [
          {
            label: 'Race Distribution',
            data: [
              surveyData?.mealsAmericanIndian ?? 0,
              surveyData?.mealsAsian ?? 0,
              surveyData?.mealsBlack ?? 0,
              surveyData?.mealsLatinx ?? 0,
              surveyData?.mealsNativeHawaiian ?? 0,
              surveyData?.mealsMultiRacial ?? 0,
              surveyData?.mealsWhite ?? 0,
              surveyData?.mealsOtherRace ?? 0,
              surveyData?.mealsRaceUnknown ?? 0,
            ],
            backgroundColor: [
              '#D95D39', // Muted rust
              '#45B7D1', // Muted turquoise
              '#2D4654', // Dark slate
              '#98B06F', // Muted olive
              '#6B4E71', // Muted purple
              '#D98E32', // Muted orange
              '#9EA7AA', // Light gray
              '#B55A30', // Terracotta
              '#626D71', // Dark gray
            ],
            hoverBackgroundColor: [
              '#C54D29', // Darker rust
              '#35A7C1', // Darker turquoise
              '#1D3644', // Darker slate
              '#88A05F', // Darker olive
              '#5B3E61', // Darker purple
              '#C97E22', // Darker orange
              '#8E979A', // Darker light gray
              '#A54A20', // Darker terracotta
              '#525D61', // Darker gray
            ],
          },
        ],
      };

      setChartData({ ageData, raceData });
    }
  }, [surveyData]);

  useEffect(() => {
    // Update avgChartData when networkAverages changes
    if (networkAverages) {
      const ageData = {
        labels: ['Infants', 'Children', 'Adults', 'Seniors', 'Unknown'],
        datasets: [
          {
            label: 'Age Distribution',
            data: [
              networkAverages?.mealsInfants ?? 0,
              networkAverages?.mealsChildren ?? 0,
              networkAverages?.mealsAdults ?? 0,
              networkAverages?.mealsSeniors ?? 0,
              networkAverages?.mealsAgeUnknown ?? 0,
            ],
            backgroundColor: [
              '#7C9CB4', // Muted blue
              '#86A873', // Muted green
              '#B47C8E', // Muted rose
              '#8E8EA6', // Muted purple
              '#A8A8A8', // Muted gray
            ],
            hoverBackgroundColor: [
              '#6B8BA3', // Darker blue
              '#759662', // Darker green
              '#A36B7D', // Darker rose
              '#7D7D95', // Darker purple
              '#979797', // Darker gray
            ],
          },
        ],
      };

      const raceData = {
        labels: [
          'American Indian',
          'Asian',
          'Black',
          'Latinx',
          'Native Hawaiian',
          'Multi Racial',
          'White',
          'Other',
          'Unknown',
        ],
        datasets: [
          {
            label: 'Race Distribution',
            data: [
              networkAverages?.mealsAmericanIndian ?? 0,
              networkAverages?.mealsAsian ?? 0,
              networkAverages?.mealsBlack ?? 0,
              networkAverages?.mealsLatinx ?? 0,
              networkAverages?.mealsNativeHawaiian ?? 0,
              networkAverages?.mealsMultiRacial ?? 0,
              networkAverages?.mealsWhite ?? 0,
              networkAverages?.mealsOtherRace ?? 0,
              networkAverages?.mealsRaceUnknown ?? 0,
            ],
            backgroundColor: [
              '#D95D39', // Muted rust
              '#45B7D1', // Muted turquoise
              '#2D4654', // Dark slate
              '#98B06F', // Muted olive
              '#6B4E71', // Muted purple
              '#D98E32', // Muted orange
              '#9EA7AA', // Light gray
              '#B55A30', // Terracotta
              '#626D71', // Dark gray
            ],
            hoverBackgroundColor: [
              '#C54D29', // Darker rust
              '#35A7C1', // Darker turquoise
              '#1D3644', // Darker slate
              '#88A05F', // Darker olive
              '#5B3E61', // Darker purple
              '#C97E22', // Darker orange
              '#8E979A', // Darker light gray
              '#A54A20', // Darker terracotta
              '#525D61', // Darker gray
            ],
          },
        ],
      };

      setAvgChartData({ ageData, raceData });
    }
  }, [networkAverages]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    onClick(event: any, elements: any[], chart: any) {
      if (elements.length > 0) {
        const { index } = elements[0];
        const meta = chart.getDatasetMeta(0);

        // Toggle visibility
        if (meta.data[index]) {
          meta.data[index].hidden = !meta.data[index].hidden;
        }

        // Update legend item style
        const { legendItems } = chart.legend;
        if (legendItems?.[index]) {
          const isHidden = meta.data[index].hidden;
          legendItems[index].hidden = isHidden;

          // Make the color box translucent when hidden
          if (isHidden) {
            meta.data[
              index
            ].options.backgroundColor = `${meta.data[index].options.backgroundColor}40`;
          } else {
            meta.data[index].options.backgroundColor = meta.data[
              index
            ].options.backgroundColor.replace(/40$/, '');
          }
        }

        chart.update();
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#000000',
          generateLabels(chart: any) {
            const { data } = chart;
            if (data.labels.length && data.datasets.length) {
              const meta = chart.getDatasetMeta(0);
              if (!meta?.data) return [];

              return data.labels.map((label: string, i: number) => {
                const style = meta.controller.getStyle(i);
                const isHidden = meta.data[i]?.hidden || false;

                return {
                  text: label,
                  fillStyle: isHidden
                    ? `${style.backgroundColor}40`
                    : style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: isHidden,
                  index: i,
                };
              });
            }
            return [];
          },
        },
        onClick(e: any, legendItem: any, legend: any) {
          const { index } = legendItem;
          const { chart: ci } = legend;

          if (ci.isDatasetVisible(0)) {
            const meta = ci.getDatasetMeta(0);
            if (!meta.data) return;

            // Toggle only the clicked item's visibility
            if (meta.data[index]) {
              meta.data[index].hidden = !meta.data[index].hidden;
            }

            // Update only the clicked legend item's style
            const { legendItems } = legend.chart.legend;
            if (legendItems?.[index]) {
              const isHidden = meta.data[index].hidden;
              legendItems[index].hidden = isHidden;

              // Make the color box translucent when hidden
              if (isHidden) {
                meta.data[
                  index
                ].options.backgroundColor = `${meta.data[index].options.backgroundColor}40`;
              } else {
                meta.data[index].options.backgroundColor = meta.data[
                  index
                ].options.backgroundColor.replace(/40$/, '');
              }
            }

            ci.update();
          }
        },
      },
      tooltip: {
        enabled: true,
        position: 'nearest' as const,
        titleAlign: 'left' as const,
        bodyAlign: 'left' as const,
        padding: 12,
        caretPadding: 6,
        callbacks: {
          title(tooltipItems: any[]) {
            return `    ${tooltipItems[0].label}`;
          },
          label(context: any) {
            const { dataset } = context;
            const meta = context.chart.getDatasetMeta(0);
            if (!meta?.data) return '';

            const value = dataset.data[context.dataIndex];
            const total = dataset.data.reduce(
              (acc: number, data: number) => acc + data,
              0,
            );
            const percentageOfTotal = ((value / total) * 100).toFixed(1);

            // Calculate percentage of displayed data if there are hidden segments
            const visibleData = dataset.data.filter(
              (_: any, index: number) => !meta.data[index]?.hidden,
            );
            const hasHiddenSegments = meta.data.some((d: any) => d?.hidden);

            if (hasHiddenSegments) {
              const visibleTotal = visibleData.reduce(
                (acc: number, data: number) => acc + data,
                0,
              );
              const percentageOfVisible = (
                (value / visibleTotal) *
                100
              ).toFixed(1);

              return [
                `Total: ${value.toLocaleString()}`,
                `${percentageOfTotal}% of total`,
                `${percentageOfVisible}% of displayed`,
              ];
            }

            return [
              `Total: ${value.toLocaleString()}`,
              `${percentageOfTotal}% of total`,
            ];
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 6,
        titleSpacing: 4,
        titleMarginBottom: 8,
      },
    },
  };

  const fetchAllNetworkAverages = async (
    selectedYear: number,
    yearRangeFilter: number[],
    mealTypeFilter: string,
    mealRangeFilter: string,
  ) => {
    console.log('Fetching network averages for year:', selectedYear);

    const fields = [
      // basic stats
      'costPerMeal',
      'foodCostPercentage',
      'mealReimbursement',
      'hungerReliefsMealsServed',
      'grossRevenueCafe',
      'grossRevenueRestaurant',
      'grossRevenueCatering',
      'grossRevenueFoodTruck',
      'grossRevenueWholesale',
      'grossRevenueFoodSubscription',
      'retailSocialEnterpriseRevenue',
    ];

    const averages: { [key: string]: number | null } = {};

    await Promise.all(
      fields.map(async (field) => {
        try {
          console.log(
            `trying to get network avg route with ${field} ${selectedYear} ${mealTypeFilter} ${mealRangeFilter}`,
          );
          const [startYear, endYear] = yearRangeFilter;
          const response = await getData(
            `kitchen_outcomes/network-average/${field}/${startYear}/${endYear}/${mealTypeFilter}/${mealRangeFilter}/${selectedModelOrganizationComparison}`,
          );
          averages[field] = response.data.average;
        } catch (error) {
          console.error(`Error fetching network average for ${field}:`, error);
          averages[field] = null;
        }
      }),
    );

    try {
      console.log('trying to call route with year: ', selectedYear);
      const [startYear, endYear] = yearRangeFilter;
      const response2 = await getData(
        `kitchen_outcomes/distri/${startYear}/${endYear}/${mealTypeFilter}/${mealRangeFilter}/${selectedModelOrganizationComparison}`,
      );
      console.log('response data: ', response2.data);
      const ageRaceData = response2.data;

      Object.keys(ageRaceData.ageDistribution).forEach((field) => {
        averages[field] = ageRaceData.ageDistribution[field];
      });
    } catch (error) {
      console.error('Error fetching age-race distributions:', error);
    }

    console.log('Fetched network averages:', averages);
    setNetworkAverages(averages);
    return averages;
  };

  useEffect(() => {
    if (year) {
      fetchAllNetworkAverages(Number(year), yearRange, mealType, mealRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    year,
    yearRange,
    mealType,
    mealRange,
    selectedModelOrganizationComparison,
  ]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="left" sx={{ my: 4 }}>
        Kitchen Outcomes Visualization
      </Typography>

      {/* Year and Organization Selectors - made smaller and more compact */}
      <Grid
        container
        spacing={2}
        sx={{
          mb: 4,
          maxWidth: '500px', // Constrain max width
        }}
      >
        <Grid item xs={7}>
          <TextField
            label="Organization"
            variant="outlined"
            select
            size="small" // Make the field smaller
            fullWidth
            value={orgId}
            onChange={handleOrgSelection}
          >
            {orgList?.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.name}
              </MenuItem>
            )) ?? []}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Year"
            variant="outlined"
            select
            size="small" // Make the field smaller
            fullWidth
            value={year}
            onChange={(event) => {
              console.log(event.target.value);
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
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Network Average Filters
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="Compare against Model Organization Members?"
            control={
              <Checkbox
                checked={selectedModelOrganizationComparison}
                onChange={() => {
                  setSelectedModelOrganizationComparison(
                    !selectedModelOrganizationComparison,
                  );
                }}
                style={{ color: 'black' }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            select
            size="small"
            fullWidth
            label="Meal Type"
            value={mealType}
            onChange={handleMealTypeChange}
          >
            {mealTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            select
            size="small"
            fullWidth
            label="Number of Meals Served"
            value={mealRange}
            onChange={handleMealRangeChange}
          >
            {mealRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Year Range</Typography>
          <Slider
            value={yearRange}
            onChange={handleYearRangeChange}
            valueLabelDisplay="auto"
            min={2017}
            max={currentYear}
            sx={{ color: 'black' }}
          />
        </Grid>
      </Grid>

      {/* Tabs - now left justified */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <Box
          sx={{
            bgcolor: '#555',
            borderRadius: '14px', // Increased outer container radius
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
              '& .MuiTabs-scroller': {
                margin: '2px',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .Mui-selected': {
                color: '#000 !important',
              },
              '& .MuiTouchRipple-root': {
                color: '#666',
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
                  borderRadius: '8px', // Decreased inner tab radius
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
              minHeight: '700px',
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

      {/* Content for each tab */}
      <Box sx={{ p: 2, position: 'relative' }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Hunger Relief
            </Typography>
            <Grid container spacing={3}>
              {/* Age Distribution Chart */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Age Distribution
                  </Typography>
                  <Box
                    sx={{ flex: 1, position: 'relative', minHeight: '300px' }}
                  >
                    <Doughnut data={chartData.ageData} options={options} />
                  </Box>
                </Card>
              </Grid>

              {/* Race Distribution Chart */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Race Distribution
                  </Typography>
                  <Box
                    sx={{ flex: 1, position: 'relative', minHeight: '300px' }}
                  >
                    <Doughnut data={chartData.raceData} options={options} />
                  </Box>
                </Card>
              </Grid>

              {/* Important Figures */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Important Figures
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        label: 'Cost per Meal',
                        value: surveyData?.costPerMeal,
                        prefix: '$',
                      },
                      {
                        label: 'Food Cost Percentage',
                        value: surveyData?.foodCostPercentage,
                        suffix: '%',
                      },
                      {
                        label: 'Meal Reimbursement',
                        value: surveyData?.mealReimbursement,
                        prefix: '$',
                      },
                      {
                        label: 'Hunger Relief Meals Served',
                        value: surveyData?.hungerReliefsMealsServed,
                      },
                    ].map((item) => (
                      <Grid item xs={12} key={item.label}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            gutterBottom
                          >
                            {item.label}
                          </Typography>
                          <Typography variant="h6">
                            {item.prefix || ''}
                            {item.value?.toLocaleString() || 'N/A'}
                            {item.suffix || ''}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 4, mb: 4 }}>
              Network Averages
            </Typography>
            <Grid container spacing={3}>
              {/* Age Distribution Chart */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Network Average Age Distribution
                  </Typography>
                  <Box
                    sx={{ flex: 1, position: 'relative', minHeight: '300px' }}
                  >
                    <Doughnut data={avgChartData.ageData} options={options} />
                  </Box>
                </Card>
              </Grid>

              {/* Race Distribution Chart */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Network Average Race Distribution
                  </Typography>
                  <Box
                    sx={{ flex: 1, position: 'relative', minHeight: '300px' }}
                  >
                    <Doughnut data={avgChartData.raceData} options={options} />
                  </Box>
                </Card>
              </Grid>

              {/* Important Figures */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Network Average Important Figures
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        label: 'Network Avg. Cost per Meal',
                        value: networkAverages.costPerMeal
                          ? `${networkAverages.costPerMeal.toFixed(2)}`
                          : 'NaN',
                        prefix: '$',
                      },
                      {
                        label: 'Network Avg. Food Cost Percentage',
                        value: networkAverages.foodCostPercentage
                          ? networkAverages.foodCostPercentage.toFixed(2)
                          : 'NaN',
                        suffix: '%',
                      },
                      {
                        label: 'Network Avg. Meal Reimbursement',
                        value: networkAverages.mealReimbursement
                          ? networkAverages.mealReimbursement.toFixed(2)
                          : 'NaN',
                        prefix: '$',
                      },
                      {
                        label: 'Network Avg. Hunger Relief Meals Served',
                        value: networkAverages.hungerReliefsMealsServed
                          ? Number(
                              networkAverages.hungerReliefsMealsServed.toFixed(
                                2,
                              ),
                            ).toLocaleString()
                          : 'NaN',
                      },
                    ].map((item) => (
                      <Grid item xs={12} key={item.label}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            gutterBottom
                          >
                            {item.label}
                          </Typography>
                          <Typography variant="h6">
                            {item.prefix || ''}
                            {item.value?.toLocaleString() || 'N/A'}
                            {item.suffix || ''}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Social Enterprise
            </Typography>
            <Grid container spacing={4} direction="column">
              {/* Revenue Distribution Chart */}
              <Grid item>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(236, 239, 237, 0.5)', // Added the subtle green-grey tint
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Enterprise Revenue Distribution
                  </Typography>

                  <Grid container spacing={3}>
                    {[
                      {
                        label: 'Cafe',
                        value: surveyData?.grossRevenueCafe,
                        avg:
                          typeof networkAverages.grossRevenueCafe === 'number'
                            ? Number(
                                networkAverages.grossRevenueCafe.toFixed(2),
                              ).toLocaleString()
                            : null,
                      },
                      {
                        label: 'Restaurant',
                        value: surveyData?.grossRevenueRestaurant,
                        avg:
                          typeof networkAverages.grossRevenueRestaurant ===
                          'number'
                            ? Number(
                                networkAverages.grossRevenueRestaurant.toFixed(
                                  2,
                                ),
                              ).toLocaleString()
                            : null,
                      },
                      {
                        label: 'Catering',
                        value: surveyData?.grossRevenueCatering,
                        avg:
                          typeof networkAverages.grossRevenueCatering ===
                          'number'
                            ? Number(
                                networkAverages.grossRevenueCatering.toFixed(2),
                              ).toLocaleString()
                            : null,
                      },
                      {
                        label: 'Food Truck',
                        value: surveyData?.grossRevenueFoodTruck,
                        avg:
                          typeof networkAverages.grossRevenueFoodTruck ===
                          'number'
                            ? Number(
                                networkAverages.grossRevenueFoodTruck.toFixed(
                                  2,
                                ),
                              ).toLocaleString()
                            : null,
                      },
                      {
                        label: 'Wholesale',
                        value: surveyData?.grossRevenueWholesale,
                        avg:
                          typeof networkAverages.grossRevenueWholesale ===
                          'number'
                            ? Number(
                                networkAverages.grossRevenueWholesale.toFixed(
                                  2,
                                ),
                              ).toLocaleString()
                            : null,
                      },
                      {
                        label: 'Food Subscription',
                        value: surveyData?.grossRevenueFoodSubscription,
                        avg:
                          typeof networkAverages.grossRevenueFoodSubscription ===
                          'number'
                            ? Number(
                                networkAverages.grossRevenueFoodSubscription.toFixed(
                                  2,
                                ),
                              ).toLocaleString()
                            : null,
                      },
                    ].map((enterprise) => (
                      <Grid item xs={12} sm={6} md={4} key={enterprise.label}>
                        <Card
                          elevation={2}
                          sx={{
                            p: 2,
                            bgcolor:
                              enterprise.value === 'No Enterprise'
                                ? '#f5f5f5'
                                : 'rgba(236, 239, 237, 0.7)',
                            height: '100%',
                            border:
                              enterprise.value === 'No Enterprise'
                                ? 'none'
                                : '1px solid rgba(72, 148, 72, 0.2)',
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                              color:
                                enterprise.value === 'No Enterprise'
                                  ? 'text.secondary'
                                  : '#2e7d32',
                            }}
                          >
                            {enterprise.label}
                          </Typography>
                          <Typography
                            variant="h5"
                            color={
                              enterprise.value === 'No Enterprise'
                                ? 'text.secondary'
                                : '#2e7d32'
                            }
                            sx={{ fontWeight: 500 }}
                          >
                            {enterprise.value || 'N/A'}
                          </Typography>
                          <Typography sx={{ mt: 0.5 }}>
                            Network Avg: ${enterprise.avg}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>

              {/* Total Revenue */}
              <Grid item>
                <Card
                  sx={{
                    p: 3,
                    bgcolor: '#f8fbf8',
                    border: '1px solid rgba(72, 148, 72, 0.2)',
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ color: '#2e7d32' }}
                  >
                    Total Social Enterprise Revenue
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: '#2e7d32',
                      fontWeight: 500,
                    }}
                  >
                    $
                    {surveyData?.retailSocialEnterpriseRevenue?.toLocaleString() ||
                      'N/A'}
                  </Typography>
                  <Typography align="center" sx={{ mt: 0.5 }}>
                    Network Avg: $
                    {typeof networkAverages?.retailSocialEnterpriseRevenue ===
                    'number'
                      ? Number(
                          networkAverages.retailSocialEnterpriseRevenue.toFixed(
                            2,
                          ),
                        ).toLocaleString()
                      : null}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Capital Projects
            </Typography>
            <Grid container spacing={4}>
              {/* Project Status */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: 'rgba(236, 239, 237, 0.5)', // Very subtle green-grey tint
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Project Status
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1">
                      {surveyData?.capitalExpansionProjects ||
                        'No status available'}
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              {/* Project Details */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: 'rgba(236, 239, 237, 0.5)', // Very subtle green-grey tint
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Project Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Project Size
                      </Typography>
                      <Typography variant="h6">
                        $
                        {surveyData?.capitalProjectSize?.toLocaleString() ||
                          'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Project Date
                      </Typography>
                      <Typography variant="h6">
                        {surveyData?.capitalProjectDate
                          ? new Date(
                              surveyData.capitalProjectDate,
                            ).toLocaleDateString()
                          : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Primary Need
                      </Typography>
                      <Typography variant="h6">
                        {surveyData?.capitalExpansionProjectNeeds || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
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
            <Grid container spacing={4}>
              {/* Organization Details */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(236, 239, 237, 0.5)', // Very subtle green-grey tint
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Organization Name
                      </Typography>
                      <Typography variant="h6">
                        {surveyData?.organizationName || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Responder Name
                      </Typography>
                      <Typography variant="h6">
                        {surveyData?.responderName || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Responder Title
                      </Typography>
                      <Typography variant="h6">
                        {surveyData?.responderTitle || 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Survey Sharing Preference */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(236, 239, 237, 0.5)',
                    height: '100%', // Match parent height
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Survey Sharing Preference
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      p: 3,
                      bgcolor:
                        surveyData?.shareSurvey === 'Yes'
                          ? 'rgba(232, 245, 233, 0.7)'
                          : 'rgba(236, 239, 237, 0.5)',
                      borderRadius: 2,
                      textAlign: 'center',
                      flex: 1, // Take up remaining space
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center', // Center content vertically
                    }}
                  >
                    <Typography
                      variant="h5"
                      color={
                        surveyData?.shareSurvey === 'Yes'
                          ? 'success.main'
                          : 'text.secondary'
                      }
                    >
                      {surveyData?.shareSurvey === 'Yes'
                        ? 'Sharing Enabled'
                        : 'Not Sharing'}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {surveyData?.shareSurvey === 'Yes'
                        ? 'This organization has agreed to share their survey data.'
                        : 'This organization has opted not to share their survey data.'}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default KitchenOutcomesVisualization;

// create type for kitchenOutcomeData
