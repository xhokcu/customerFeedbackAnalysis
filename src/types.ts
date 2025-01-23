export interface FeedbackItem {
  feedback: string;
  sentiment:
    | 'POSITIVE'
    | 'NEGATIVE'
    | 'NEUTRAL'
    | 'positive'
    | 'negative'
    | 'neutral';
  score: number;
}

export interface AnalyticsData {
  labels: string[];
  values: number[];
}
