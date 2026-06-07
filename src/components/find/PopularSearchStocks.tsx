import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { PopularStockItem } from "./types";

type PopularSearchStocksProps = {
  items: PopularStockItem[];
};

export function PopularSearchStocks({ items }: PopularSearchStocksProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>인기 검색 종목</Text>
        <Ionicons name="chevron-forward" size={20} color="#334155" />
      </View>
      <View style={styles.cardRow}>
        {items.length > 0 ? (
          items.map((item) => {
            const isUp = item.direction === "up";
            const isDown = item.direction === "down";

            return (
              <View key={item.rank} style={styles.card}>
                <View style={styles.nameRow}>
                  <Text style={styles.rankBadge}>{item.rank}</Text>
                  <Text numberOfLines={1} style={styles.nameText}>
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={
                    isUp
                      ? styles.changeUp
                      : isDown
                        ? styles.changeDown
                        : styles.changeFlat
                  }
                >
                  {isUp ? "▲" : isDown ? "▼" : "-"} {item.change}%
                </Text>
              </View>
            );
          })
        ) : (
          <View style={styles.card}>
            <Text style={styles.emptyText}>데이터 없음</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
  cardRow: {
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rankBadge: {
    width: 20,
    height: 20,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
    color: "#0f172a",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 10,
    fontWeight: "800",
  },
  nameText: {
    flex: 1,
    color: "#0f172a",
    fontSize: 11,
    fontWeight: "800",
  },
  changeUp: {
    color: "#ff1717",
    fontSize: 11,
    fontWeight: "800",
  },
  changeDown: {
    color: "#0b6cff",
    fontSize: 11,
    fontWeight: "800",
  },
  changeFlat: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "800",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
  },
});
