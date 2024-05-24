import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utilites/colors";

const ResetButton = ({ isSelected, setIsSelected, onReset, setMessage }) => {
  return (
    <Pressable
      onPress={() => {
        onReset();
        setIsSelected(false);
        setMessage("");
      }}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Tout afficher</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.GREEN,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  title: {
    color: colors.GREY,
    fontWeight: "500",
  },
});
export default ResetButton;
