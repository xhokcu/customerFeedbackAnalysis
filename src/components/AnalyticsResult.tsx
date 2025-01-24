import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FeedbackItem } from '../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

interface AnalyticsResultProps {
  data: FeedbackItem[];
}

const AnalyticsResult: React.FC<AnalyticsResultProps> = ({ data }) => {
  const sentimentCounts = data.reduce(
    (acc, item) => {
      const sentiment = item.sentiment ? item.sentiment.toUpperCase() : ''; // Kontrol ekledik
      if (sentiment === 'POS') {
        acc.POSITIVE += 1;
      } else if (sentiment === 'NEG') {
        acc.NEGATIVE += 1;
      } else if (sentiment === 'NEU') {
        acc.NEUTRAL += 1;
      }
      return acc;
    },
    { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 },
  );

  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [
          sentimentCounts.POSITIVE,
          sentimentCounts.NEGATIVE,
          sentimentCounts.NEUTRAL,
        ],
        backgroundColor: ['#7FB77E', '#BB423F', '#7C9CBF'],
        hoverBackgroundColor: ['#6da36c', '#a33936', '#6a89ac'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = data.length;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const barChartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [
          sentimentCounts.POSITIVE,
          sentimentCounts.NEGATIVE,
          sentimentCounts.NEUTRAL,
        ],
        backgroundColor: ['#7FB77E', '#BB423F', '#7C9CBF'],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="analytics-result">
      <h2>Sentiment Analysis Results</h2>
      <div className="charts-row">
        <div className="chart-container">
          <Pie data={chartData} options={options} />
        </div>
        <div className="chart-container">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      <div className="sentiment-summary">
        <p>Total Feedbacks: {data.length}</p>
        <p>Positive: {sentimentCounts.POSITIVE}</p>
        <p>Negative: {sentimentCounts.NEGATIVE}</p>
        <p>Neutral: {sentimentCounts.NEUTRAL}</p>
      </div>
    </div>
  );
};

export default AnalyticsResult;
