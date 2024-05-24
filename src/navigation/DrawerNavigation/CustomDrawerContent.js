import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useAuth } from "../../context/authContext";

const CustomDrawerContent = (props) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{ textTransform: "uppercase", fontWeight: "bold" }}
        label="Se déconnecter"
        onPress={() => {
          logout();
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
