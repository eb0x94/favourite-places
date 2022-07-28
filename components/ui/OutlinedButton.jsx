import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const OutlinedButton = ({ onPress, icon, children }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons
                style={styles.icon}
                name={icon}
                size={18}
                color={Colors.primary500}
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500,
        borderRadius:4
    },
    pressed: { opacity: 0.5 },
    text: { color: Colors.primary500 },
    icon: {
        marginRight: 6,
    },
});

export default OutlinedButton;
