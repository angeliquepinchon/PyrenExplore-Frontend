import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../context/authContext";
import colors from "../../utilites/colors";
import {
  AuthStackNavigator,
  DiscoveriesStackNavigator,
} from "../StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { authState } = useAuth();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: colors.LIGHTGREEN,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: colors.GREEN,
        drawerLabelStyle: {
          textTransform: "uppercase",
        },
      })}
      initialRouteName="Auth"
    >
      {authState.token ? (
        <Drawer.Screen
          name="Decouvrir"
          component={DiscoveriesStackNavigator}
          options={{ drawerLabel: "Découvrir", title: "PyrenExplore" }} //swipeEnabled: false }}
          listeners={{
            drawerItemPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Discoveries" }],
              });
            },
          }}
        />
      ) : (
        <Drawer.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            drawerLabel: "PyrenExplore",
            title: "PyrenExplore",
            swipeEnabled: false,
            headerShown: false,
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
