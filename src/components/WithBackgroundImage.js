import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const imageSource = require("../../assets/montagne.jpg");

const WithBackgroundImage = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default WithBackgroundImage;
