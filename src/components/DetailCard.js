import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import colors from "../utilites/colors";
import WithBackGroundImage from "./WithBackgroundImage";
import GoBackButton from "./buttons/GoBackButton";

const DetailCard = ({ children, title, image }) => {
  const navigation = useNavigation();
  return (
    <WithBackGroundImage>
      <View style={styles.mainContainer}>
        <GoBackButton onPress={() => navigation.navigate("Discoveries")} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
          </View>
        </View>
        <ScrollView style={styles.content}>{children}</ScrollView>
      </View>
    </WithBackGroundImage>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.GREEN,
    fontSize: 20,
    marginTop: 80,
    marginBottom: 50,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: -50,
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  content: {
    position: "relative",
    borderTopRightRadius: 57,
    borderTopLeftRadius: 57,
    backgroundColor: colors.RGBA,
    marginTop: 50,
    paddingHorizontal: 40,
  },
});

export default DetailCard;
