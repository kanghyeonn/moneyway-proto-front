import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"
import { Pressable, View, StyleSheet } from "react-native";
import { IconMenu2 } from '@tabler/icons-react-native';

export function HeaderAction() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.push("/search")}>
                <Ionicons name="search-outline" size={20} color="gray"/>
            </Pressable>
            <Pressable onPress={() => router.push("/menu")}>
                <IconMenu2 stroke="gray" strokeWidth={2} size={24} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
        marginRight: 16
    }
})