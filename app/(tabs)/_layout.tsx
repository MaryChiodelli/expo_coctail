import { ThemeContext } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import { useContext } from 'react';
import { Pressable } from "react-native";

export default function TabsLayout() {
  const { colors } = useContext(ThemeContext);
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.text,
      tabBarActiveTintColor: colors.primary,
      tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", headerTitle: "Expo Coctails", tabBarIcon: () => <Ionicons name="home" size={24} color={colors.text} />, headerRight: () => <ToggleThemeButton /> }} />
      <Tabs.Screen name="search" options={{ title: "Search", headerTitle: "Search", tabBarIcon: () => <Ionicons name="search" size={24} color={colors.text} />, headerRight: () => <ToggleThemeButton /> }} />
    </Tabs>
  )
}

const ToggleThemeButton = () => {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);
  return (
    <Pressable onPress={() => toggleTheme()}><Ionicons name={theme === "dark" ? "sunny" : "moon"} size={24} color={colors.text} /></Pressable>
  )
}

