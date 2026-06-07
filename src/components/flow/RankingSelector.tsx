import { Pressable, StyleSheet, Text } from "react-native";

type RankingSelectorProps = {
  label: string;
  onPress: () => void;
};

export function RankingSelector({ label, onPress }: RankingSelectorProps) {
  return (
    <Pressable onPress={onPress} style={styles.selector}>
      <Text style={styles.selectorText}>{label}</Text>
      <Text style={styles.selectorIcon}>⌄</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selector: {
    height: 44,
    borderWidth: 1,
    borderColor: "#0b5cff",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
  },
  selectorIcon: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
  },
});
