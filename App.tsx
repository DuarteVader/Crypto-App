import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { config, GluestackUIProvider, LinearGradient, Text } from "@gluestack-ui/themed"
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from "./src/contexts/AuthContext";
import Routes from "./src/Routes";
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from "./src/hooks/useLoadFonts";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded } = useLoadFonts();

  if(!fontsLoaded)
    return null;

  return (
    <GluestackUIProvider config={config.theme}>
      <StatusBar style="light" translucent />
      <NavigationContainer>
        <AuthProvider>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </AuthProvider>
      </NavigationContainer>     
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
