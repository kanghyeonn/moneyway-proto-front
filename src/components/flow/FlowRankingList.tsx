import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { RankingItem } from "./types";

type FlowRankingListProps = {
  title: string;
  sortLabel: string;
  items: RankingItem[];
};

export function FlowRankingList({
  title,
  sortLabel,
  items,
}: FlowRankingListProps) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sortControl}>
          <Text style={styles.sortText}>{sortLabel}</Text>
          <Ionicons name="chevron-down-outline" size={12} />
        </View>
      </View>

      <View style={styles.rankingList}>
        {items.map((item) => (
          <View key={item.rank} style={styles.rankingRow}>
            <Text
              style={[
                styles.rankBadge,
                item.rank === 1 && styles.rankBadgeFirst,
                item.rank === 2 && styles.rankBadgeSecond,
                item.rank === 3 && styles.rankBadgeThird,
              ]}
            >
              {item.rank}
            </Text>
            <Text style={styles.rankingName}>{item.name}</Text>
            <View style={styles.rankingContainer}>
              <Text style={styles.rankingScore}>{item.score}</Text>
              <Text
                style={
                  item.direction === "up"
                    ? styles.directionUp
                    : styles.directionDown
                }
              >
                {item.direction === "up" ? "▲" : "▼"}
              </Text>
              <Text
                numberOfLines={1}
                style={
                  item.direction === "up" ? styles.changeUp : styles.changeDown
                }
              >
                {item.change}
              </Text>
              <Text
                style={
                  item.direction === "up"
                    ? styles.percentUp
                    : styles.percentDowm
                }
              >
                %
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  sortControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "600",
  },
  rankingList: {
    gap: 14,
  },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 28,
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    color: "#111827",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "600",
    marginRight: 16,
  },
  rankBadgeFirst: {
    backgroundColor: "#ffc65a",
  },
  rankBadgeSecond: {
    backgroundColor: "#cbd5e1",
  },
  rankBadgeThird: {
    backgroundColor: "#d6b49a",
  },
  rankingName: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
    fontWeight: "600",
  },
  rankingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 134,
  },
  rankingScore: {
    width: 44,
    marginRight: 12,
    color: "#111827",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "600",
  },
  directionUp: {
    width: 10,
    color: "#ff1717",
    textAlign: "right",
    fontSize: 10,
    fontWeight: "600",
  },
  directionDown: {
    width: 10,
    color: "#0aa889",
    textAlign: "right",
    fontSize: 10,
    fontWeight: "600",
  },
  changeUp: {
    width: 56,
    color: "#ff1717",
    marginLeft: -15,
    textAlign: "right",
    fontSize: 10,
    fontWeight: "600",
  },
  changeDown: {
    width: 56,
    color: "#0aa889",
    marginLeft: -15,
    textAlign: "right",
    fontSize: 10,
    fontWeight: "600",
  },
  percentUp: {
    color: "#ff1717",
    fontSize: 10,
    fontWeight: "600",
  },
  percentDowm: {
    color: "#0aa889",
    fontSize: 10,
    fontWeight: "600",
  },
});
