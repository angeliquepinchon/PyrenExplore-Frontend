import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../utilites/colors";

const PurpleButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    width: 200,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: colors.PURPLE,
    shadowColor: colors.DARKGREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default PurpleButton;
