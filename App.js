import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider } from "./src/context/authContext";
import MainDrawerNavigation from "./src/navigation/DrawerNavigation/MainDrawerNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainDrawerNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
