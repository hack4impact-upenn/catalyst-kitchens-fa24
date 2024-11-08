import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

function HorizontalBarChart(data: any) {
  const labels = [
    'Unsheltered',
    'Justice-Impacted',
    'In-Recovery',
    'Mental Health',
    'Disability',
    'Food Insecurity',
    'Unemployment',
  ];

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Your organization',
  //         data: [70, 60, 80, 90, 50, 65, 85], // Sample data values
  //         backgroundColor: 'rgba(59, 134, 246, 1)',
  //       },
  //       {
  //         label: 'Network Average',
  //         data: [60, 55, 75, 80, 45, 60, 80], // Sample data values
  //         backgroundColor: 'rgba(146, 200, 160, 1)',
  //       },
  //     ],
  //   };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y', // Make the chart horizontal
    scales: {
      x: {
        min: 0,
        max: 100, // Set x-axis range from 0 to 100
      },
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'right',
        formatter: (value) => value.toString(), // Display value at the end of each bar
        color: 'black',
      },
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '10px',
        width: '1000px',
        height: '500px',
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default HorizontalBarChart;
