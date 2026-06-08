import { Ionicons } from "@expo/vector-icons";
import { IconMenu2 } from "@tabler/icons-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/auth/AuthContext";

export function HeaderAction() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
      setIsMenuOpen(false);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel="검색"
        hitSlop={8}
        onPress={() => router.push("/search")}
      >
        <Ionicons name="search-outline" size={20} color="gray" />
      </Pressable>
      <Pressable
        accessibilityLabel="메뉴"
        hitSlop={8}
        onPress={() => setIsMenuOpen(true)}
      >
        <IconMenu2 stroke="gray" strokeWidth={2} size={24} />
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
        transparent
        visible={isMenuOpen}
      >
        <Pressable
          accessibilityLabel="메뉴 닫기"
          onPress={() => setIsMenuOpen(false)}
          style={styles.backdrop}
        >
          <Pressable
            style={styles.menu}
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              disabled={isSigningOut}
              onPress={handleSignOut}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && !isSigningOut ? styles.menuItemPressed : null,
              ]}
            >
              {isSigningOut ? (
                <ActivityIndicator size="small" color="#ef4444" />
              ) : (
                <Ionicons name="log-out-outline" size={18} color="#ef4444" />
              )}
              <Text style={styles.logoutText}>
                {isSigningOut ? "로그아웃 중" : "로그아웃"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginRight: 16,
  },
  backdrop: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 12,
    paddingTop: 88,
  },
  menu: {
    minWidth: 132,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 6,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  menuItem: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  menuItemPressed: {
    backgroundColor: "#fef2f2",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "700",
  },
});
