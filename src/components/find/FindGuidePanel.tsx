import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const guides = [
  {
    icon: "time-outline" as const,
    title: "거래대금 상위",
    description: "당일 가장 많은 거래대금이 발생한 종목 순위",
  },
  {
    icon: "bar-chart-outline" as const,
    title: "거래량 상위",
    description: "당일 가장 많은 거래량이 발생한 종목 순위",
  },
  {
    icon: "flash-outline" as const,
    title: "급상승 상위",
    description: "당일 기준 등락률이 높은 종목 순위",
  },
  {
    icon: "trending-down-outline" as const,
    title: "급하락 상위",
    description: "당일 기준 등락률이 낮은 종목 순위",
  },
];

export function FindGuidePanel() {
  return (
    <View style={styles.panel}>
      <View style={styles.grid}>
        {guides.map((guide) => (
          <View key={guide.title} style={styles.guideItem}>
            <View style={styles.iconBox}>
              <Ionicons name={guide.icon} size={24} color="#0b5cff" />
            </View>
            <View style={styles.guideText}>
              <Text style={styles.guideTitle}>{guide.title}</Text>
              <Text style={styles.guideDescription}>{guide.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.notice}>※ 당일 데이터는 장중 변동될 수 있습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    gap: 18,
  },
  grid: {
    gap: 16,
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  guideText: {
    flex: 1,
    gap: 4,
  },
  guideTitle: {
    color: "#0f172a",
    fontSize: 13,
    fontWeight: "800",
  },
  guideDescription: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
  },
  notice: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },
});
