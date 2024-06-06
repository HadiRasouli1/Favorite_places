import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const IconBytton = ({ icon, color, size, onPressFunc }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPressFunc}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconBytton;
const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
