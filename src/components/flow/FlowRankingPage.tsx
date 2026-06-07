import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { DailyDateSelector } from "./DailyDateSelector";
import { FlowRankingList } from "./FlowRankingList";
import { FlowStrengthInfo } from "./FlowStrengthInfo";
import { FlowSummaryCard } from "./FlowSummaryCard";
import { FlowTopStocks } from "./FlowTopStocks";
import { PeriodSegment } from "./PeriodSegment";
import { RankingSelector } from "./RankingSelector";
import type { FlowPeriod, FlowRankingDatasets, RankingKind } from "./types";

type FlowRankingPageProps = {
  period: FlowPeriod;
  selectorPrefix: string;
  summaryPrefix: string;
  rankingPrefix: string;
  datasets: FlowRankingDatasets;
  error?: string | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  dateSelector?: {
    dateLabel: string;
    onPreviousDate: () => void;
    onNextDate: () => void;
    onOpenDatePicker?: () => void;
  };
};

const rankingLabels: Record<RankingKind, string> = {
  sector: "섹터",
  theme: "테마",
};

export function FlowRankingPage({
  period,
  selectorPrefix,
  summaryPrefix,
  rankingPrefix,
  datasets,
  error,
  isLoading,
  isRefreshing,
  onRefresh,
  dateSelector,
}: FlowRankingPageProps) {
  const [rankingKind, setRankingKind] = useState<RankingKind>("sector");
  const label = rankingLabels[rankingKind];
  const dataset = datasets[rankingKind];
  const leader = dataset.leader ?? dataset.items[0];

  const toggleRankingKind = () => {
    setRankingKind((current) => (current === "sector" ? "theme" : "sector"));
  };

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
      <PeriodSegment period={period} />
      {dateSelector ? (
        <DailyDateSelector
          dateLabel={dateSelector.dateLabel}
          onPreviousDate={dateSelector.onPreviousDate}
          onNextDate={dateSelector.onNextDate}
          onOpenDatePicker={dateSelector.onOpenDatePicker}
        />
      ) : (
        <RankingSelector
          label={`${selectorPrefix} ${label} 랭킹`}
          onPress={toggleRankingKind}
        />
      )}
      <FlowSummaryCard
        title={`${summaryPrefix} 주도 ${label} 요약`}
        label={label}
        leader={leader}
        risingCount={dataset.risingCount}
        fallingCount={dataset.fallingCount}
      />
      {isLoading ? (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>주도 {label} 데이터를 불러오는 중입니다.</Text>
        </View>
      ) : error ? (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>주도 {label} 데이터를 불러오지 못했습니다.</Text>
        </View>
      ) : dataset.items.length === 0 ? (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>표시할 주도 {label} 데이터가 없습니다.</Text>
        </View>
      ) : (
        <>
          <FlowRankingList
            title={`${rankingPrefix} ${label} 랭킹`}
            sortLabel={`${label}강도 기준`}
            items={dataset.items}
          />
          <FlowStrengthInfo
            title={`${label}강도란?`}
            description={`당일 ${label} 내 종목들의 누적 거래대금, 전일 대비 등락률, 상승 / 하락 종목 비율, 거래대금 집중도를 종합하여 산출한 지표입니다.`}
          />
          <FlowTopStocks title={`TOP ${label} 종목`} groups={dataset.topStocks} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    gap: 20,
  },
  statusBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 18,
    backgroundColor: "#f8fafc",
  },
  statusText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
