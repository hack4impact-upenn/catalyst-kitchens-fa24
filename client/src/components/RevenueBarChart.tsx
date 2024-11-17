import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Typography, Card } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface RevenueBarChartProps {
  grossRevenues: number[]; // List of revenue values
  userOrganizationRevenue: number; // User's organization revenue value
  label: string; // Label for the chart
}

function RevenueBarChart({
  grossRevenues,
  userOrganizationRevenue,
  label,
}: RevenueBarChartProps) {
  const categories = [
    'No Enterprise',
    'Less than $100K',
    '$100K to $250K',
    '$250K to $500K',
    '$500K to $1M',
    'Over $1M',
  ];

  // Helper function to categorize a revenue value
  function categorizeRevenue(revenue: number): string {
    if (revenue === 0) {
      return 'No Enterprise';
    }
    if (revenue < 100000) {
      return 'Less than $100K';
    }
    if (revenue < 250000) {
      return '$100K to $250K';
    }
    if (revenue < 500000) {
      return '$250K to $500K';
    }
    if (revenue < 1000000) {
      return '$500K to $1M';
    }
    return 'Over $1M';
  }

  // helper function to calculate the average of non-zero values
  function calculateAverage(revenues: number[]): number {
    const nonZeroRevenues = revenues.filter((revenue) => revenue !== 0);
    const sum = nonZeroRevenues.reduce((acc, revenue) => acc + revenue, 0);
    return nonZeroRevenues.length > 0 ? sum / nonZeroRevenues.length : 0;
  }

  // Count the occurrences of each category
  const grossRevenueCounts = grossRevenues.reduce(
    (acc: { [key: string]: number }, revenue) => {
      const category = categorizeRevenue(revenue);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {},
  );

  // Create chart data
  const chartData = categories.map((category) => {
    const count = grossRevenueCounts[category] || 0;
    return {
      category,
      count,
      isUserOrganization:
        category === categorizeRevenue(userOrganizationRevenue),
    };
  });

  // Prepare the data structure for Chart.js
  const data = {
    labels: categories, // x-axis labels (category names)
    datasets: [
      {
        label: 'Organizations by Revenue Range',
        data: chartData.map((item) => item.count),
        backgroundColor: chartData.map((item) =>
          item.isUserOrganization
            ? 'rgba(46, 125, 50, 0.7)'
            : 'rgba(169, 169, 169, 0.7)',
        ),
        borderColor: chartData.map((item) =>
          item.isUserOrganization
            ? 'rgba(46, 125, 50, 1)'
            : 'rgba(169, 169, 169, 1)',
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        {label}
      </div>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: [
                `Average Gross Revenue: $${calculateAverage(
                  grossRevenues,
                ).toLocaleString()}`,
              ],
              padding: {
                top: 10,
                bottom: 30, // Adds space below the title for the subtitle
              },
            },
            legend: {
              display: false, // Disable the default legend
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Number of Organizations',
              },
              beginAtZero: true,
              max: grossRevenues.length, // Set maximum y-axis value to the number of organizations
              ticks: {
                stepSize: 1, // Ensure each step represents a whole number (useful for counts)
                callback(value) {
                  return Number.isInteger(value) ? value : null; // Display only integer values
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default RevenueBarChart;
