import { StyleSheet, Text, View } from "react-native";

type FlowStrengthInfoProps = {
  title: string;
  description: string;
};

export function FlowStrengthInfo({ title, description }: FlowStrengthInfoProps) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  infoTitle: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  infoText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
  },
});
