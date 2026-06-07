import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { FindDirection, MarketSummaryItem } from "./types";

type MarketSummaryProps = {
  items: MarketSummaryItem[];
};

export function MarketSummary({ items }: MarketSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>시장 요약</Text>
      <View style={styles.cardRow}>
        {items.length > 0 ? (
          items.map((item) => (
            <MarketCard
              key={item.code}
              name={item.label}
              value={item.value}
              change={item.change}
              direction={item.direction}
            />
          ))
        ) : (
          <>
            <MarketCard name="KOSPI" value="-" change="-" direction="flat" />
            <MarketCard name="KOSDAQ" value="-" change="-" direction="flat" />
          </>
        )}
      </View>
    </View>
  );
}

function MarketCard({
  name,
  value,
  change,
  direction,
}: {
  name: string;
  value: string;
  change: string;
  direction: FindDirection;
}) {
  const isUp = direction === "up";
  const isDown = direction === "down";
  const iconName = isDown ? "trending-down" : isUp ? "trending-up" : "remove";
  const color = isDown ? "#0b6cff" : isUp ? "#ff1717" : "#64748b";

  return (
    <View style={styles.marketCard}>
      <View>
        <Text style={styles.marketName}>{name}</Text>
        <Text style={styles.marketValue}>{value}</Text>
        <Text style={[styles.marketChange, { color }]}>
          {isUp ? "▲" : isDown ? "▼" : "-"} {change}
        </Text>
      </View>
      <Ionicons name={iconName} size={28} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
  marketCard: {
    flex: 1,
    minHeight: 92,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  marketName: {
    color: "#0f172a",
    fontSize: 11,
    fontWeight: "800",
  },
  marketValue: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
  },
  marketChange: {
    color: "#ff1717",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 6,
  },
});
