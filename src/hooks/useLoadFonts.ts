import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Inter_400': Inter_400Regular,
    'Inter_500': Inter_500Medium,
    'Inter_600': Inter_600SemiBold,
    'Inter_700': Inter_700Bold,
    'Inter_900': Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
};

export default useLoadFonts;
