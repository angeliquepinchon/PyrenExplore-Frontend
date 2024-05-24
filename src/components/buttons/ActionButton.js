import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utilites/colors";

const ActionButton = ({ title, openModal }) => {
  return (
    <Pressable style={styles.container} onPress={openModal}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <AntDesign name="pluscircleo" size={30} color={colors.GREEN} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontWeight: "500",
  },
});
export default ActionButton;
