import type {
  FindDirection,
  FindRankingItem,
  MarketSummaryItem,
  PopularStockItem,
} from "@/components/find/types";

import { fetchJson } from "./client";

export type FindRankingType =
  | "trading_value"
  | "trading_volume"
  | "top_gainers"
  | "top_losers";

type DiscoveryDirection = "up" | "down" | "flat";

type DiscoveryStatusResponse = {
  status_label: string;
  basis_label: string;
  display_time: string;
  latest_snapshot_at: string;
  is_delayed: boolean;
};

type DiscoveryRankingItem = {
  rank: number;
  short_code: string;
  name: string;
  price: number | null;
  trade_amount: number | null;
  volume: number | null;
  change_rate: number | null;
  direction: DiscoveryDirection;
};

type DiscoveryRankingResponse = {
  type: FindRankingType;
  basis_time: string;
  items: DiscoveryRankingItem[];
};

type DiscoveryMarketIndex = {
  code: string;
  label: string;
  value: number;
  change: number;
  change_rate: number;
  direction: DiscoveryDirection;
};

type DiscoveryMarketSummaryResponse = {
  indices: DiscoveryMarketIndex[];
};

type DiscoveryAdvanceDeclineResponse = {
  up_count: number;
  up_delta: number;
  down_count: number;
  down_delta: number;
  unchanged_count: number;
  basis_time: string;
};

type DiscoveryPopularSearchItem = {
  rank: number;
  short_code: string;
  name: string;
  change_rate: number;
  direction: DiscoveryDirection;
};

type DiscoveryPopularSearchResponse = {
  items: DiscoveryPopularSearchItem[];
};

type DiscoveryOverviewResponse = {
  status: DiscoveryStatusResponse;
  ranking: DiscoveryRankingResponse;
  market_summary: DiscoveryMarketSummaryResponse;
  advance_decline: DiscoveryAdvanceDeclineResponse;
  popular_searches: DiscoveryPopularSearchResponse;
};

export type FindDiscoveryData = {
  statusLabel: string;
  time: string;
  rankingItems: FindRankingItem[];
  marketItems: MarketSummaryItem[];
  advanceDecline: {
    upCount: number;
    upDelta: number;
    downCount: number;
    downDelta: number;
  };
  popularItems: PopularStockItem[];
};

export const emptyFindDiscoveryData: FindDiscoveryData = {
  statusLabel: "-",
  time: "-",
  rankingItems: [],
  marketItems: [],
  advanceDecline: {
    upCount: 0,
    upDelta: 0,
    downCount: 0,
    downDelta: 0,
  },
  popularItems: [],
};

const toDirection = (direction: DiscoveryDirection): FindDirection => direction;

const formatNumber = (value: number | null | undefined, digits = 0) => {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "-";
  }

  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
};

const formatChange = (value: number | null | undefined) => {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "-";
  }

  return Math.abs(value).toFixed(2).replace(/\.00$/, "");
};

const formatTradeAmount = (value: number | null) => {
  if (value === null || !Number.isFinite(value)) {
    return "-";
  }

  const hundredMillion = value / 100000000;

  if (hundredMillion >= 1) {
    return `${Math.round(hundredMillion).toLocaleString("ko-KR")}억`;
  }

  return `${Math.round(value / 10000).toLocaleString("ko-KR")}만`;
};

const formatMetric = (item: DiscoveryRankingItem, type: FindRankingType) => {
  if (type === "trading_volume") {
    return formatNumber(item.volume);
  }

  return formatTradeAmount(item.trade_amount);
};

const mapRankingItem = (
  item: DiscoveryRankingItem,
  type: FindRankingType,
): FindRankingItem => ({
  rank: item.rank,
  name: item.name,
  price: formatNumber(item.price),
  metric: formatMetric(item, type),
  change: formatChange(item.change_rate),
  direction: toDirection(item.direction),
});

const mapMarketItem = (item: DiscoveryMarketIndex): MarketSummaryItem => ({
  code: item.code,
  label: item.label,
  value: formatNumber(item.value, 2),
  change: `${formatNumber(Math.abs(item.change), 2)} (${formatChange(item.change_rate)}%)`,
  direction: toDirection(item.direction),
});

const mapPopularItem = (item: DiscoveryPopularSearchItem): PopularStockItem => ({
  rank: item.rank,
  name: item.name,
  change: formatChange(item.change_rate),
  direction: toDirection(item.direction),
});

const mapOverview = (overview: DiscoveryOverviewResponse): FindDiscoveryData => ({
  statusLabel: overview.status.status_label,
  time: overview.status.display_time,
  rankingItems: overview.ranking.items.map((item) =>
    mapRankingItem(item, overview.ranking.type),
  ),
  marketItems: overview.market_summary.indices.map(mapMarketItem),
  advanceDecline: {
    upCount: overview.advance_decline.up_count,
    upDelta: overview.advance_decline.up_delta,
    downCount: overview.advance_decline.down_count,
    downDelta: overview.advance_decline.down_delta,
  },
  popularItems: overview.popular_searches.items.map(mapPopularItem),
});

export const fetchFindDiscoveryData = async (
  options: {
    rankingType: FindRankingType;
    signal: AbortSignal;
  },
) => {
  const overview = await fetchJson<DiscoveryOverviewResponse>(
    "/api/market/discovery/overview",
    {
      params: {
        ranking_type: options.rankingType,
        ranking_limit: 30,
        popular_limit: 3,
      },
      signal: options.signal,
    },
  );

  return mapOverview(overview);
};
