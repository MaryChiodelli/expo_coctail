import { ThemeContext } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { Pressable } from "react-native";

const ToggleThemeButton = () => {
    const { theme, colors, toggleTheme } = useContext(ThemeContext);
    return (
        <Pressable onPress={() => toggleTheme()}><Ionicons name={theme === "dark" ? "sunny" : "moon"} size={24} color={colors.text} /></Pressable>
    )
}

export default ToggleThemeButton;