import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/login";

import { NavigationStackProps } from "../types/Navigation";
import { ImageBackground } from "react-native";

const Stack = createNativeStackNavigator<NavigationStackProps>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, orientation: "all" }}>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
