import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import React from "react";
import { Text } from "react-native";

import FlashMessage from "react-native-flash-message";

import { AuthProvider } from "./src/context/authContext";
import MainDrawerNavigation from "./src/navigation/DrawerNavigation/MainDrawerNavigation";

const prefix = Linking.createURL("myapp://");
const expoPrefix = "exp://192.168.1.101:8081";

const App = () => {
  const linking = {
    prefixes: [prefix, expoPrefix],
    config: {
      screens: {
        Home: "home",
        UpdatePassword: "updatepassword/:token",
      },
    },
  };
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <AuthProvider>
        <MainDrawerNavigation />
        <FlashMessage position="bottom" />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
