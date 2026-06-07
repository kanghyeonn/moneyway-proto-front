import { FindPage } from "./FindPage";
import { useFindDiscoveryData } from "./useFindDiscoveryData";
import type { FindMetricOrder } from "./types";
import type { FindRankingType } from "@/api/find";

type FindDiscoveryScreenProps = {
  rankingType: FindRankingType;
  metricHeader: string;
  metricOrder: FindMetricOrder;
  footnote: string;
};

export function FindDiscoveryScreen({
  rankingType,
  metricHeader,
  metricOrder,
  footnote,
}: FindDiscoveryScreenProps) {
  const {
    statusLabel,
    time,
    rankingItems,
    marketItems,
    advanceDecline,
    popularItems,
    error,
    isLoading,
    isRefreshing,
    refetch,
  } = useFindDiscoveryData(rankingType);

  return (
    <FindPage
      statusLabel={statusLabel}
      time={time}
      metricHeader={metricHeader}
      metricOrder={metricOrder}
      footnote={footnote}
      rankingItems={rankingItems}
      marketItems={marketItems}
      popularItems={popularItems}
      advanceDecline={advanceDecline}
      error={error}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={refetch}
    />
  );
}
