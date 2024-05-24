import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../utilites/colors";

export const ITEM_WIDTH = Math.round(250 * 0.9);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={item.imgUrl} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 8,
    width: "100%",
  },
  image: {
    width: 160,
    height: 160,
  },
  header: {
    color: colors.DARKGREY,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    color: colors.DARKGREY,
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 30,
  },
});

export default CarouselCardItem;
