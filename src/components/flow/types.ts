export type FlowPeriod = "today" | "daily";
export type RankingKind = "sector" | "theme";

export type RankingItem = {
  rank: number;
  name: string;
  score: string;
  change: string;
  direction: "up" | "down";
};

export type TopStockItem = {
  name: string;
  price: string;
  change: string;
  direction: "up" | "down";
};

export type TopStockGroup = {
  label: string;
  stocks: TopStockItem[];
};

export type FlowRankingDataset = {
  items: RankingItem[];
  leader?: RankingItem;
  risingCount: number;
  fallingCount: number;
  topStocks: TopStockGroup[];
};

export type FlowRankingDatasets = Record<RankingKind, FlowRankingDataset>;
