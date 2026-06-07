import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { TopStockGroup } from "./types";

type FlowTopStocksProps = {
  title: string;
  groups: TopStockGroup[];
};

export function FlowTopStocks({ title, groups }: FlowTopStocksProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.moreButton}>
          {/*
          <Text style={styles.moreText}>더보기</Text>
          <Ionicons name="chevron-forward" size={16} color="#334155" />*/}
        </View>
      </View>

      <View style={styles.groupList}>
        {groups.map((group) => (
          <View key={group.label} style={styles.groupCard}>
            <Text style={styles.groupLabel}>{group.label}</Text>
            <View style={styles.stockList}>
              {group.stocks.map((stock) => (
                <View key={stock.name} style={styles.stockRow}>
                  <Text numberOfLines={1} style={styles.stockName}>
                    {stock.name}
                  </Text>
                  <Text style={styles.stockPrice}>{stock.price}</Text>
                  <Text
                    style={
                      stock.direction === "up"
                        ? styles.stockChangeUp
                        : styles.stockChangeDown
                    }
                  >
                    {stock.direction === "up" ? "▲" : "▼"} {stock.change}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  title: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  moreText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "600",
  },
  groupList: {
    gap: 12,
  },
  groupCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    gap: 8,
  },
  groupLabel: {
    alignSelf: "flex-start",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#dbeafe",
    color: "#0b5cff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 11,
    fontWeight: "700",
  },
  stockList: {
    gap: 8,
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockName: {
    flex: 1,
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },
  stockPrice: {
    width: 76,
    color: "#111827",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "600",
  },
  stockChangeUp: {
    width: 72,
    color: "#ff1717",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "600",
  },
  stockChangeDown: {
    width: 72,
    color: "#0aa889",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "600",
  },
});
