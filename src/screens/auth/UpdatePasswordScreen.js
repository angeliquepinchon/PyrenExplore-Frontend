import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const UpdatePasswordScreen = () => {
  const route = useRoute();
  const { token } = route.params;
  console.log("coucou");

  return (
    <View>
      <Text>Update Password Screen token : {token}</Text>
    </View>
  );
};

export default UpdatePasswordScreen;
