import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import type { RankingItem } from "./types";

type FlowSummaryCardProps = {
  title: string;
  label: string;
  leader?: RankingItem;
  risingCount: number;
  fallingCount: number;
};

export function FlowSummaryCard({
  title,
  label,
  leader,
  risingCount,
  fallingCount,
}: FlowSummaryCardProps) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {/*<Text style={styles.chevron}><Ionicons name="chevron-forward-outline" size={16}/></Text>*/}
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryColumn}>
          <View style={styles.firstContainer}>
            <Ionicons name="flame" size={12} color={"red"}/>
            <Text style={styles.caption}>1위 {label}</Text>
          </View>
          <Text style={styles.leaderName}>{leader?.name ?? "-"}</Text>
          <Text style={styles.score}>{leader?.score ?? "-"}</Text>
          <Text style={styles.upText}>
            {leader ? `${leader.direction === "up" ? "▲" : "▼"} ${leader.change}%` : "-"}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricColumn}>
          <Ionicons name="trending-up" size={21} color={"blue"}/>
          <Text style={styles.caption}>상승 {label} 수</Text>
          <Text style={styles.countText}>{risingCount}개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricColumn}>
          <Ionicons name="trending-down" size={21} color={"#0aa889"}/>
          <Text style={styles.caption}>하락 {label} 수</Text>
          <Text style={styles.countText}>{fallingCount}개</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 18,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },
  chevron: {
    color: "#334155",
    fontSize: 20,
  },
  summaryGrid: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  summaryColumn: {
    flex: 1,
    gap: 6,
  },
  metricColumn: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  divider: {
    width: 1,
    marginHorizontal: 12,
    backgroundColor: "#e5e7eb",
  },
  firstContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  caption: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "800",
    paddingTop: 4,
    paddingBottom: 4
  },
  leaderName: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
  },
  score: {
    color: "#0b5cff",
    fontSize: 12,
    fontWeight: "900",
  },
  countText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
  },
  upText: {
    color: "#ff1717",
    fontSize: 10,
    fontWeight: "600",
  },
});
