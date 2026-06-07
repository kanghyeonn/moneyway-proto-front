import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function FlowLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daily" />
    </Stack>
  );
}
