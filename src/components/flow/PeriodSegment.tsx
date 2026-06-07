import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { FlowPeriod } from "./types";

type PeriodSegmentProps = {
  period: FlowPeriod;
};

export function PeriodSegment({ period }: PeriodSegmentProps) {
  const moveToPeriod = (nextPeriod: FlowPeriod) => {
    if (nextPeriod === period) {
      return;
    }

    router.replace(nextPeriod === "today" ? "/(tabs)/(flow)" : "/(tabs)/(flow)/daily");
  };

  return (
    <View style={styles.segment}>
      <Pressable
        onPress={() => moveToPeriod("today")}
        style={[styles.segmentButton, period === "today" && styles.segmentButtonActive]}
      >
        <Text style={[styles.segmentText, period === "today" && styles.segmentTextActive]}>
          당일
        </Text>
      </Pressable>
      <Pressable
        onPress={() => moveToPeriod("daily")}
        style={[styles.segmentButton, period === "daily" && styles.segmentButtonActive]}
      >
        <Text style={[styles.segmentText, period === "daily" && styles.segmentTextActive]}>
          일자별
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  segmentButtonActive: {
    backgroundColor: "#0b5cff",
  },
  segmentText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },
  segmentTextActive: {
    color: "#fff",
  },
});
