import React, { useState, useEffect } from 'react';
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
  grossRevenueCounts: { [key: string]: number }; // Object with string keys and number values
  userOrganizationRevenue: string; // A string representing the user's organization revenue category
  label: string; // A string representing the label for the chart
}

function RevenueBarChart({
  grossRevenueCounts,
  userOrganizationRevenue,
  label,
}: RevenueBarChartProps) {
  const categories = [
    'Less than $100K',
    '$100K to $250K',
    '$250K to $500K',
    '$500K to $1M',
    'Over $1M',
    'No Enterprise',
  ];

  // Create an array for the chart data
  const chartData = categories.map((category) => {
    // Get the count for each category from grossRevenueCounts or set to 0 if not present
    const count = grossRevenueCounts[category] || 0;
    return {
      category,
      count,
      isUserOrganization: category === userOrganizationRevenue, // Flag for user organization
    };
  });

  // Prepare the chart data structure for Chart.js
  const data = {
    labels: categories, // x-axis labels (category names)
    datasets: [
      {
        label: 'Organizations by Revenue Range',
        data: chartData.map((item) => item.count),
        backgroundColor: chartData.map(
          (item) =>
            item.isUserOrganization
              ? 'rgba(46, 125, 50, 0.7)'
              : 'rgba(169, 169, 169, 0.7)', // Green for user, grey for others
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
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: label,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Number of Organizations',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default RevenueBarChart;
