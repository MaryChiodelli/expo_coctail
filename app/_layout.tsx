import ToggleThemeButton from '@/components/tooggle-theme-button';
import { ThemeContext, ThemeProvider } from '@/context/ThemeContext';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import Entypo from '@expo/vector-icons/Entypo';
import { router, Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import { Pressable } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { theme, colors } = useContext(ThemeContext);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Pressable onPress={() => router.back()}><Entypo name="chevron-left" size={24} color={colors.text} /></Pressable>
            ), headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerTitle: '',
            headerRight: () => <ToggleThemeButton />,
          }}
          name="coctails/[id]"
        />
      </Stack >
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
    </>
  );
}

