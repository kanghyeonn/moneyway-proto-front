import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DailyDateSelectorProps = {
  dateLabel: string;
  onPreviousDate: () => void;
  onNextDate: () => void;
  onOpenDatePicker?: () => void;
};

export function DailyDateSelector({
  dateLabel,
  onPreviousDate,
  onNextDate,
  onOpenDatePicker,
}: DailyDateSelectorProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPreviousDate} style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={16} color="#334155" />
      </Pressable>

      <Pressable onPress={onOpenDatePicker} style={styles.dateButton}>
        <Ionicons name="calendar-outline" size={16} color="#475569" />
        <Text style={styles.dateText}>{dateLabel}</Text>
        <Ionicons name="chevron-down" size={18} color="#475569" />
      </Pressable>

      <Pressable onPress={onNextDate} style={styles.arrowButton}>
        <Ionicons name="chevron-forward" size={16} color="#334155" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dateText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
  },
});
