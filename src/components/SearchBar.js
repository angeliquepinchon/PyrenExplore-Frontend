import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import colors from "../utilites/colors";

const SearchBar = ({ value, onChangeText, validate }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchBar__input}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable
        onPress={() => {
          validate(value);
        }}
        style={styles.searchBar__button}
      >
        <AntDesign name="search1" size={24} color={colors.GREY} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    borderRadius: 40,
    height: 40,
  },
  searchBar__input: {
    flex: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.GREEN,
    padding: 5,
    paddingLeft: 15,
    color: colors.DARKGREY,
  },
  searchBar__button: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: "100%",
    backgroundColor: colors.GREEN,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // padding: 5,
  },
});

export default SearchBar;
