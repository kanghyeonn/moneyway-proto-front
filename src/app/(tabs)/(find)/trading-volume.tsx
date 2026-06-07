import { FindDiscoveryScreen } from "@/components/find/FindDiscoveryScreen";

export default function TradingVolumeScreen() {
  return (
    <FindDiscoveryScreen
      rankingType="trading_volume"
      metricHeader="거래량"
      metricOrder="metric-before-change"
      footnote="단위: 주                              거래량: 당일 장중 누적 기준"
    />
  );
}
