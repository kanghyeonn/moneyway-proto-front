import { StyleSheet, Text, View } from "react-native";

type AdvanceDeclineBarProps = {
  upCount: number;
  upDelta: number;
  downCount: number;
  downDelta: number;
};

export function AdvanceDeclineBar({
  upCount,
  upDelta,
  downCount,
  downDelta,
}: AdvanceDeclineBarProps) {
  const total = upCount + downCount;
  const upFlex = total > 0 ? upCount / total : 1;
  const downFlex = total > 0 ? downCount / total : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>상승/하락 종목</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.upLabel}>상승</Text>
          <Text style={styles.upCount}>
            {upCount} (▲ {upDelta})
          </Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.upFill, { flex: upFlex }]} />
          <View style={[styles.downFill, { flex: downFlex }]} />
        </View>
        <View>
          <Text style={styles.downLabel}>하락</Text>
          <Text style={styles.downCount}>
            {downCount} (▼ {downDelta})
          </Text>
        </View>
      </View>
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
  card: {
    minHeight: 66,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  upLabel: {
    color: "#ff1717",
    fontSize: 11,
    fontWeight: "800",
  },
  upCount: {
    color: "#ff1717",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },
  downLabel: {
    color: "#0b6cff",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "800",
  },
  downCount: {
    color: "#0b6cff",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
  },
  upFill: {
    backgroundColor: "#ff2d2d",
  },
  downFill: {
    backgroundColor: "#1f7aff",
  },
});
