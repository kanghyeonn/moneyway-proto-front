import type {
  FlowRankingDataset,
  FlowRankingDatasets,
  RankingItem,
  TopStockGroup,
  TopStockItem,
} from "@/components/flow/types";

import { fetchJson } from "./client";

type LeadershipKind = "sector" | "theme";

type LeadershipSide = "bullish" | "bearish";

type LeadershipStatusResponse = {
  display_time: string;
  latest_snapshot_batch_at: string;
};

type LeadershipSnapshotResponse = {
  snapshot_batch_at: string;
};

type LeadershipSummaryResponse = {
  bullish_count: number;
  bearish_count: number;
  top_bullish: LeadershipCategoryItem | null;
};

type LeadershipCategoryItem = {
  id: number;
  name: string;
  side: LeadershipSide;
  score: string;
  weighted_change_rate: string;
  top_stocks: LeadershipStockItem[] | null;
};

type LeadershipRankingResponse = {
  items: LeadershipCategoryItem[];
};

type LeadershipStockItem = {
  name: string;
  price: string;
  change_rate: string;
};

export type FlowLeadershipData = {
  datasets: FlowRankingDatasets;
  displayTime?: string;
  snapshotBatchAt?: string;
};

const createEmptyDataset = (): FlowRankingDataset => ({
  risingCount: 0,
  fallingCount: 0,
  items: [],
  leader: undefined,
  topStocks: [],
});

export const emptyFlowDatasets: FlowRankingDatasets = {
  sector: createEmptyDataset(),
  theme: createEmptyDataset(),
};

const formatKstDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const toNumber = (value: string | number | null | undefined) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatDecimal = (value: number, digits = 1) => {
  return value.toFixed(digits).replace(/\.0$/, "");
};

const formatScore = (score: string) => {
  return formatDecimal(toNumber(score) * 100, 1);
};

const formatWeightedChange = (weightedChangeRate: string) => {
  return formatDecimal(Math.abs(toNumber(weightedChangeRate) * 100), 2);
};

const formatStockChange = (changeRate: string) => {
  return formatDecimal(Math.abs(toNumber(changeRate)), 2);
};

const formatPrice = (price: string) => {
  return Math.trunc(toNumber(price)).toLocaleString("ko-KR");
};

const getDirection = (value: string) => {
  return toNumber(value) >= 0 ? "up" : "down";
};

const mapRankingItem = (
  item: LeadershipCategoryItem,
  rank: number,
): RankingItem => ({
  rank,
  name: item.name,
  score: formatScore(item.score),
  change: formatWeightedChange(item.weighted_change_rate),
  direction: getDirection(item.weighted_change_rate),
});

const mapRankingItems = (items: LeadershipCategoryItem[]): RankingItem[] => {
  return items.map((item, index) => mapRankingItem(item, index + 1));
};

const mapTopStock = (stock: LeadershipStockItem): TopStockItem => ({
  name: stock.name,
  price: formatPrice(stock.price),
  change: formatStockChange(stock.change_rate),
  direction: getDirection(stock.change_rate),
});

const mapTopStocks = (items: LeadershipCategoryItem[]): TopStockGroup[] => {
  return items
    .filter((item) => item.top_stocks && item.top_stocks.length > 0)
    .slice(0, 3)
    .map((item) => ({
      label: item.name,
      stocks: item.top_stocks?.slice(0, 3).map(mapTopStock) ?? [],
    }));
};

const fetchSnapshotBatchAt = async (date: Date | undefined, signal: AbortSignal) => {
  if (date) {
    const snapshot = await fetchJson<LeadershipSnapshotResponse>(
      "/api/market/leadership/snapshots/latest",
      {
        params: { date: formatKstDate(date) },
        signal,
      },
    );

    return {
      displayTime: `${formatKstDate(date).replace(/-/g, ".")} 기준`,
      snapshotBatchAt: snapshot.snapshot_batch_at,
    };
  }

  const status = await fetchJson<LeadershipStatusResponse>(
    "/api/market/leadership/status",
    { signal },
  );

  return {
    displayTime: status.display_time,
    snapshotBatchAt: status.latest_snapshot_batch_at,
  };
};

const fetchDataset = async (
  kind: LeadershipKind,
  snapshotBatchAt: string,
  signal: AbortSignal,
) => {
  const path = kind === "sector" ? "sectors" : "themes";
  const [summary, ranking] = await Promise.all([
    fetchJson<LeadershipSummaryResponse>(
      `/api/market/leadership/${path}/summary`,
      {
        params: { snapshot_batch_at: snapshotBatchAt },
        signal,
      },
    ),
    fetchJson<LeadershipRankingResponse>(`/api/market/leadership/${path}`, {
      params: {
        side: "bullish",
        top_n: 20,
        sort: "score_desc",
        include_top_stocks: 3,
        snapshot_batch_at: snapshotBatchAt,
      },
      signal,
    }),
  ]);

  return {
    risingCount: summary.bullish_count,
    fallingCount: summary.bearish_count,
    leader: summary.top_bullish
      ? mapRankingItem(summary.top_bullish, 1)
      : undefined,
    items: mapRankingItems(ranking.items),
    topStocks: mapTopStocks(ranking.items),
  };
};

export const fetchFlowLeadershipData = async (
  options: {
    date?: Date;
    signal: AbortSignal;
  },
): Promise<FlowLeadershipData> => {
  const { displayTime, snapshotBatchAt } = await fetchSnapshotBatchAt(
    options.date,
    options.signal,
  );

  const [sector, theme] = await Promise.all([
    fetchDataset("sector", snapshotBatchAt, options.signal),
    fetchDataset("theme", snapshotBatchAt, options.signal),
  ]);

  return {
    displayTime,
    snapshotBatchAt,
    datasets: {
      sector,
      theme,
    },
  };
};
