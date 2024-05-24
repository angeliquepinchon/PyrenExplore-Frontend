import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../utilites/colors";

const GreenButton = ({ onPress, title }) => {
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
    borderColor: "green",
    borderWidth: 2,
    width: 200,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.GREEN,
  },
});

export default GreenButton;
