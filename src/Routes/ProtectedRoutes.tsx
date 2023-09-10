import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/home";

import { NavigationStackProps } from "../types/Navigation";
import { ImageBackground } from "react-native";

const Stack = createNativeStackNavigator<NavigationStackProps>();

const ProtectedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, orientation: "all" }}>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
