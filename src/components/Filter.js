import { Entypo } from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import colors from "../utilites/colors";

const Filter = ({ type, isSelected, setIsSelected, onTypeSelected }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.filterButton}
        onPress={() => setIsSelected(!isSelected)}
      >
        <Text style={{ color: colors.GREY }}>Trier</Text>
        {!isSelected ? (
          <Entypo name="triangle-down" size={20} color={colors.GREY} />
        ) : (
          <Entypo name="triangle-up" size={20} color={colors.GREY} />
        )}
      </Pressable>
      {isSelected ? (
        <FlatList
          style={styles.flatList}
          data={type}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                key={item.id}
                onPress={() => {
                  onTypeSelected(item.type);
                  setIsSelected(false);
                }}
              >
                <View>
                  <Text style={styles.flatListType}>{item.type}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  filterButton: {
    backgroundColor: colors.GREEN,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    width: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  flatList: {
    position: "absolute",
    top: 27,
    left: 0,
    right: 0,
    backgroundColor: colors.GREEN,
    zIndex: 1,
    padding: 10,
    width: 160,
  },
  flatListType: {
    color: "white",
    paddingTop: 10,
  },
});

export default Filter;
