import { HeaderAction } from "@/components/headerActions";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/js-tabs";
import { StyleSheet, Animated, Pressable } from "react-native";
import { type BottomTabBarButtonProps } from "expo-router/build/react-navigation/bottom-tabs";
import { useRef } from "react";


const AnimatedTabBarButton = ({
  children,
  onPress,
  accessibilityState,
  style,
}: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 200
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style,
      ]}
      // Disable Android ripple effect
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};


export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: true,
            headerTitle: "Money Way",
            headerRight: () => <HeaderAction />,
            tabBarButton: ({children, onPress, accessibilityState, style}) => (
                <AnimatedTabBarButton children={children} onPress={onPress} accessibilityState={accessibilityState} style={style} />
            ),
        }}
        >
        <Tabs.Screen
            name="(home)/index"
            options={{
            tabBarLabel: "뉴스",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                name="newspaper-outline"
                size={24}
                color={focused ? "rgb(0, 122, 255)" : "#9ca3af"}
                />
            ),
            }}
        />
        <Tabs.Screen
            name="(flow)"
            options={{
            title: "주도 섹터 / 주도 테마",
            tabBarLabel: "섹터",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                name="cellular-outline"
                size={24}
                color={focused ? "rgb(0, 122, 255)" : "#9ca3af"}
                />
            ),
            }}
        />
        <Tabs.Screen
            name="interest"
            options={{
            tabBarLabel: "관심",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                name="heart-outline"
                size={24}
                color={focused ? "rgb(0, 122, 255)" : "#9ca3af"}
                />
            ),
            }}
        />
        <Tabs.Screen
            name="(find)"
            options={{
            tabBarLabel: "발견",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                name="planet-outline"
                size={24}
                color={focused ? "rgb(0, 122, 255)" : "#9ca3af"}
                style={styles.findIcon}
                />
            ),
            }}
        />
        </Tabs>
    );
}

const styles = StyleSheet.create({
  findIcon: {
    transform: [{ scaleX: -1 }],
  },
});
