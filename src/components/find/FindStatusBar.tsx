import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type FindStatusBarProps = {
  label: string;
  time: string;
};

export function FindStatusBar({ label, time }: FindStatusBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusLabel}>
        <View style={styles.dot} />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>{time}</Text>
        {/*<Ionicons name="refresh" size={24} color="#0f172a" />*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#14b8a6",
  },
  labelText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "700",
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "600",
  },
});
