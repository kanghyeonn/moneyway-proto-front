export type FindDirection = "up" | "down" | "flat";
export type FindMetricOrder = "metric-before-change" | "change-before-metric";

export type FindRankingItem = {
  rank: number;
  name: string;
  price: string;
  metric: string;
  change: string;
  direction: FindDirection;
};

export type PopularStockItem = {
  rank: number;
  name: string;
  change: string;
  direction: FindDirection;
};

export type MarketSummaryItem = {
  code: string;
  label: string;
  value: string;
  change: string;
  direction: FindDirection;
};
