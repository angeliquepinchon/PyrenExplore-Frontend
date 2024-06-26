import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/LoginScreen";
import PasswordResetScreen from "../screens/auth/PasswordResetScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import DiscoveriesScreen from "../screens/user/DiscoveriesScreen";
import HomeScreen from "../screens/user/HomeScreen";
import SpeciesDetailScreen from "../screens/user/SpeciesDetailScreen";
import UpdatePasswordScreen from "../screens/auth/UpdatePasswordScreen";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ title: "Découvrir" }}
        name="Discoveries"
        component={DiscoveriesScreen}
      />
      <Stack.Screen
        options={{ title: "Détail de l'espèce" }}
        name="Detail"
        component={SpeciesDetailScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
const DiscoveriesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ title: "PyrenexPlore" }}
        name="Discoveries"
        component={DiscoveriesScreen}
      />
      <Stack.Screen
        options={{
          title: "Détail de l'espèce",
        }}
        name="Detail"
        component={SpeciesDetailScreen}
      />
    </Stack.Navigator>
  );
};

export { AuthStackNavigator, DiscoveriesStackNavigator };
