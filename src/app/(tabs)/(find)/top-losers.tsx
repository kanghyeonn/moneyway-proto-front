import { FindDiscoveryScreen } from "@/components/find/FindDiscoveryScreen";

export default function TopLosersScreen() {
  return (
    <FindDiscoveryScreen
      rankingType="top_losers"
      metricHeader="거래대금"
      metricOrder="change-before-metric"
      footnote="거래대금: 당일 장중 누적 기준 (단위: 원)"
    />
  );
}
