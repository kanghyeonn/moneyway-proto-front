import { withLayoutContext } from "expo-router";
import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "expo-router/js-top-tabs";
import type {
  ParamListBase,
  TabNavigationState,
} from "expo-router/build/react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <View style={styles.container}>
      {/*<View style={styles.header}>
        <Text style={styles.headerText}>발견</Text>
        <View style={styles.headerActions}>
          <Ionicons name="search-outline" size={26} color="#0f172a" />
          <Ionicons name="notifications-outline" size={26} color="#0f172a" />
        </View>
      </View>*/}
      <MaterialTopTabs
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: "#0b5cff",
          tabBarInactiveTintColor: "#475569",
          tabBarIndicatorStyle: styles.tabIndicator,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
        }}
      >
        <MaterialTopTabs.Screen
          name="trading-value"
          options={{ title: "거래대금 상위" }}
        />
        <MaterialTopTabs.Screen
          name="trading-volume"
          options={{ title: "거래량 상위" }}
        />
        <MaterialTopTabs.Screen
          name="top-gainers"
          options={{ title: "급상승 상위" }}
        />
        <MaterialTopTabs.Screen
          name="top-losers"
          options={{ title: "급하락 상위" }}
        />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#0f172a",
    fontSize: 20,
    fontWeight: "800",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    paddingHorizontal: 0,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  tabIndicator: {
    backgroundColor: "#0b5cff",
    height: 2,
  },
});
