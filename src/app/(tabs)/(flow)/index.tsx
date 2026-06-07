import { FlowRankingPage } from "@/components/flow/FlowRankingPage";
import { useFlowLeadershipData } from "@/components/flow/useFlowLeadershipData";

export default function TodayFlowScreen() {
  const {
    datasets,
    displayTime,
    error,
    isLoading,
    isRefreshing,
    refetch,
  } = useFlowLeadershipData();

  return (
    <FlowRankingPage
      period="today"
      selectorPrefix={displayTime ?? "당일 기준"}
      summaryPrefix="오늘"
      rankingPrefix="당일"
      datasets={datasets}
      error={error}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={refetch}
    />
  );
}
