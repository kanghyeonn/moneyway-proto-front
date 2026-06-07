import { ScrollView, StyleSheet, Text, View } from "react-native";

import type { FindMetricOrder, FindRankingItem } from "./types";

type FindRankingTableProps = {
  metricHeader: string;
  metricOrder: FindMetricOrder;
  footnote: string;
  items: FindRankingItem[];
};

export function FindRankingTable({
  metricHeader,
  metricOrder,
  footnote,
  items,
}: FindRankingTableProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.rankHeader}>순위</Text>
        <Text style={styles.nameHeader}>종목명</Text>
        <Text style={styles.priceHeader}>현재가</Text>
        {metricOrder === "metric-before-change" ? (
          <>
            <Text style={styles.metricHeader}>{metricHeader}</Text>
            <Text style={styles.changeHeader}>등락률</Text>
          </>
        ) : (
          <>
            <Text style={styles.changeHeader}>등락률</Text>
            <Text style={styles.metricHeader}>{metricHeader}</Text>
          </>
        )}
      </View>

      <ScrollView
        nestedScrollEnabled
        style={styles.listViewport}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {items.length > 0 ? (
          items.slice(0, 30).map((item) => (
            <View key={item.rank} style={styles.row}>
              <Text
                style={[
                  styles.rankBadge,
                  item.rank === 1 && styles.rankGold,
                  item.rank === 2 && styles.rankSilver,
                  item.rank === 3 && styles.rankBronze,
                ]}
              >
                {item.rank}
              </Text>
              <Text numberOfLines={2} style={styles.nameText}>
                {item.name}
              </Text>
              <Text style={styles.priceText}>{item.price}</Text>
              {metricOrder === "metric-before-change" ? (
                <>
                  <Text style={styles.metricText}>{item.metric}</Text>
                  <ChangeText item={item} />
                </>
              ) : (
                <>
                  <ChangeText item={item} />
                  <Text style={styles.metricText}>{item.metric}</Text>
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>표시할 종목 데이터가 없습니다.</Text>
        )}
      </ScrollView>

      <Text style={styles.footnote}>{footnote}</Text>
    </View>
  );
}

function ChangeText({ item }: { item: FindRankingItem }) {
  const isUp = item.direction === "up";
  const isDown = item.direction === "down";

  return (
    <Text
      style={
        isUp ? styles.changeUp : isDown ? styles.changeDown : styles.changeFlat
      }
    >
      {isUp ? "▲" : isDown ? "▼" : "-"} {item.change}%
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  headerRow: {
    height: 34,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  rankHeader: {
    width: 42,
    color: "#64748b",
    fontSize: 9,
    fontWeight: "700",
  },
  nameHeader: {
    flex: 1,
    color: "#64748b",
    fontSize: 9,
    fontWeight: "700",
  },
  priceHeader: {
    width: 60,
    color: "#64748b",
    textAlign: "right",
    fontSize: 9,
    fontWeight: "700",
  },
  metricHeader: {
    width: 68,
    color: "#64748b",
    textAlign: "right",
    fontSize: 9,
    fontWeight: "700",
  },
  changeHeader: {
    width: 62,
    color: "#64748b",
    textAlign: "right",
    fontSize: 9,
    fontWeight: "700",
  },
  list: {
    gap: 18,
  },
  listViewport: {
    maxHeight: 520,
  },
  row: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 10,
    fontWeight: "700",
    marginRight: 12,
  },
  rankGold: {
    backgroundColor: "#ffc65a",
  },
  rankSilver: {
    backgroundColor: "#cbd5e1",
  },
  rankBronze: {
    backgroundColor: "#d6b49a",
  },
  nameText: {
    flex: 1,
    color: "#0f172a",
    fontSize: 12,
    fontWeight: "600",
  },
  priceText: {
    width: 60,
    color: "#0f172a",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "700",
  },
  metricText: {
    width: 68,
    color: "#0f172a",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "800",
  },
  changeUp: {
    width: 62,
    color: "#ff1717",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "800",
  },
  changeDown: {
    width: 62,
    color: "#0b6cff",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "800",
  },
  changeFlat: {
    width: 62,
    color: "#64748b",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "800",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 18,
  },
  footnote: {
    color: "#64748b",
    fontSize: 9,
    fontWeight: "500",
  },
});
