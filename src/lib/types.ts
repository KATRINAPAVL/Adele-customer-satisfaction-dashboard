export interface Thresholds {
  green: number;
  yellow: number;
}

export interface Pillar {
  id: number;
  name: string;
  weight: number;
  score: number;
  status: string;
  color: string;
  icon: string;
  dataSource: string;
  formula: string;
  measures: string;
  thresholds: Thresholds;
  thresholdLabels: string;
  weightRationale: string;
}

export interface CompositeScore {
  value: number;
  status: string;
  formula: string;
}

export interface FrameworkData {
  title: string;
  subtitle: string;
  dataPeriod: string;
  totalMessages: number;
  totalSessions: number;
  compositeScore: CompositeScore;
  pillars: Pillar[];
}

export interface ResolutionPoint {
  month: string;
  yes: number;
  no: number;
  rate: number;
}

export interface SentimentPoint {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  negRate: number;
}

export interface FeedbackVolumePoint {
  month: string;
  count: number;
}

export interface MonthlyTrendsData {
  resolution: ResolutionPoint[];
  sentiment: SentimentPoint[];
  feedbackVolume: FeedbackVolumePoint[];
}

export interface HeatmapItem {
  category: string;
  totalMsgs: number;
  positive: number;
  neutral: number;
  negative: number;
  negRate: number;
  status: string;
}

export interface FeedbackCategory {
  category: string;
  count: number;
  signal: string;
}

export interface CategoriesData {
  heatmap: HeatmapItem[];
  feedbackCategories: FeedbackCategory[];
}

export interface StarDistributionItem {
  stars: number;
  count: number;
  share: number;
}

export interface CountryItem {
  code: string;
  name: string;
  flag: string;
  responses: number;
  avgRating: number;
  negativeRate: number;
  distribution: Record<string, number>;
}

export interface ActionItem {
  priority: number;
  icon: string;
  title: string;
  description: string;
}

export interface RatingsData {
  starDistribution: StarDistributionItem[];
  averageStars: number;
  totalRated: number;
  totalSessions: number;
  captureRate: number;
  polarizationIndex: number;
  country: CountryItem[];
  actionItems: ActionItem[];
}

export interface TrendDataPoint {
  month: string;
  value: number;
}
