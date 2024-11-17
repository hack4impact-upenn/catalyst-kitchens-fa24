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
import { all } from 'axios';

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

function HorizontalBarChart(input: any) {
  const labels = [
    'In Recovery',
    'Intellectual Or Developmental Disability',
    'Mental Health',
    'New Americans',
    'Physical Disability',
    'Returning Citizens Or Formerly Incarcerated',
    'Unhoused',
    'Veteran',
  ];

  const {
    programData: {
      barrierInRecovery: oneBarrierInRecovery,
      barrierIntellectualOrDevelopmentalDisability:
        oneBarrierIntellectualOrDevelopmentalDisability,
      barrierMentalHealth: oneBarrierMentalHealth,
      barrierNewAmericans: oneBarrierNewAmericans,
      barrierPhysicalDisability: oneBarrierPhysicalDisability,
      barrierReturningCitizensOrFormerlyIncarceratedPersons:
        oneBarrierReturningCitizensOrFormerlyIncarceratedPersons,
      barrierUnhoused: oneBarrierUnhoused,
      barrierVeteran: oneBarrierVeteran,
    },
    avgProgramData: {
      barrierInRecovery: allBarrierInRecovery,
      barrierIntellectualOrDevelopmentalDisability:
        allBarrierIntellectualOrDevelopmentalDisability,
      barrierMentalHealth: allBarrierMentalHealth,
      barrierNewAmericans: allBarrierNewAmericans,
      barrierPhysicalDisability: allBarrierPhysicalDisability,
      barrierReturningCitizensOrFormerlyIncarceratedPersons:
        allBarrierReturningCitizensOrFormerlyIncarceratedPersons,
      barrierUnhoused: allBarrierUnhoused,
      barrierVeteran: allBarrierVeteran,
    },
  } = input;

  const data = {
    labels,
    datasets: [
      {
        label: 'Your organization',
        data: [
          oneBarrierInRecovery,
          oneBarrierIntellectualOrDevelopmentalDisability,
          oneBarrierMentalHealth,
          oneBarrierNewAmericans,
          oneBarrierPhysicalDisability,
          oneBarrierReturningCitizensOrFormerlyIncarceratedPersons,
          oneBarrierUnhoused,
          oneBarrierVeteran,
        ], // Sample data values
        backgroundColor: 'rgba(59, 134, 246, 1)',
      },
      {
        label: 'Network Average',
        data: [
          allBarrierInRecovery,
          allBarrierIntellectualOrDevelopmentalDisability,
          allBarrierMentalHealth,
          allBarrierNewAmericans,
          allBarrierPhysicalDisability,
          allBarrierReturningCitizensOrFormerlyIncarceratedPersons,
          allBarrierUnhoused,
          allBarrierVeteran,
        ], // Sample data values
        backgroundColor: 'rgba(146, 200, 160, 1)',
      },
    ],
  };

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
