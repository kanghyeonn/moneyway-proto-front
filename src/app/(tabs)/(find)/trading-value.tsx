import { FindDiscoveryScreen } from "@/components/find/FindDiscoveryScreen";

export default function TradingValueScreen() {
  return (
    <FindDiscoveryScreen
      rankingType="trading_value"
      metricHeader="거래대금"
      metricOrder="metric-before-change"
      footnote="거래대금: 최근 체결 기준 (단위: 원)"
    />
  );
}
