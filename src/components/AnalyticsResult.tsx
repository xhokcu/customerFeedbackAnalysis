import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FeedbackItem } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnalyticsResultProps {
  data: FeedbackItem[];
}

const AnalyticsResult: React.FC<AnalyticsResultProps> = ({ data }) => {
  const sentimentCounts = data.reduce(
    (acc, item) => {
      acc[item.sentiment]++;
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
        backgroundColor: ['#4CAF50', '#f44336', '#2196F3'],
        hoverBackgroundColor: ['#45a049', '#da190b', '#1976D2'],
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
  };

  return (
    <div className="analytics-result">
      <h2>Sentiment Analysis Results</h2>
      <div className="chart-container">
        <Pie data={chartData} options={options} />
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
