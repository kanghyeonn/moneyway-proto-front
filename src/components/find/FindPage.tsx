import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AdvanceDeclineBar } from "./AdvanceDeclineBar";
import { FindGuidePanel } from "./FindGuidePanel";
import { FindRankingTable } from "./FindRankingTable";
import { FindStatusBar } from "./FindStatusBar";
import { MarketSummary } from "./MarketSummary";
import { PopularSearchStocks } from "./PopularSearchStocks";
import type {
  FindMetricOrder,
  FindRankingItem,
  MarketSummaryItem,
  PopularStockItem,
} from "./types";

type FindPageProps = {
  statusLabel: string;
  time: string;
  metricHeader: string;
  metricOrder: FindMetricOrder;
  footnote: string;
  rankingItems: FindRankingItem[];
  marketItems: MarketSummaryItem[];
  popularItems: PopularStockItem[];
  error?: string | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  advanceDecline?: {
    upCount: number;
    upDelta: number;
    downCount: number;
    downDelta: number;
  };
};

export function FindPage({
  statusLabel,
  time,
  metricHeader,
  metricOrder,
  footnote,
  rankingItems,
  marketItems,
  popularItems,
  error,
  isLoading,
  isRefreshing,
  onRefresh,
  advanceDecline = {
    upCount: 654,
    upDelta: 3,
    downCount: 218,
    downDelta: 2,
  },
}: FindPageProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={Boolean(isRefreshing)}
            onRefresh={onRefresh}
            tintColor="#0b5cff"
            colors={["#0b5cff"]}
          />
        ) : undefined
      }
    >
      <FindStatusBar label={statusLabel} time={time} />
      {isLoading ? (
        <StatusBox text="발견 데이터를 불러오는 중입니다." />
      ) : error ? (
        <StatusBox text="발견 데이터를 불러오지 못했습니다." />
      ) : null}
      <FindRankingTable
        metricHeader={metricHeader}
        metricOrder={metricOrder}
        footnote={footnote}
        items={rankingItems}
      />
      <MarketSummary items={marketItems} />
      <AdvanceDeclineBar
        upCount={advanceDecline.upCount}
        upDelta={advanceDecline.upDelta}
        downCount={advanceDecline.downCount}
        downDelta={advanceDecline.downDelta}
      />
      <PopularSearchStocks items={popularItems} />
      <FindGuidePanel />
    </ScrollView>
  );
}

function StatusBox({ text }: { text: string }) {
  return (
    <View style={styles.statusBox}>
      <Text style={styles.statusText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    gap: 24,
  },
  statusBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#f8fafc",
  },
  statusText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
