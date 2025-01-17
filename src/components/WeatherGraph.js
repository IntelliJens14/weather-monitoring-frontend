import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherGraph = ({ label, data, unit }) => {
  const chartData = {
    labels: data.map((_, index) => `Point ${index + 1}`), // Replace with actual timestamps if available
    datasets: [
      {
        label: `${label} (${unit})`,
        data,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data Points',
        },
      },
      y: {
        title: {
          display: true,
          text: `${label} (${unit})`,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherGraph;
