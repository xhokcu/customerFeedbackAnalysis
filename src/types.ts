export interface FeedbackItem {
  feedback: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score: number;
}

export interface AnalyticsData {
  labels: string[];
  values: number[];
}
