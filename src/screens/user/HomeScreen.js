import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WithBackgroundImage from "../../components/WithBackgroundImage";
import GreenButton from "../../components/buttons/GreenButton";
import PurpleButton from "../../components/buttons/PurpleButton";
import CarouselCards from "../../components/carousel/CarouselCards";
import colors from "../../utilites/colors";

const HomeScreen = ({ navigation }) => {
  return (
    <WithBackgroundImage>
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image source={require("../../../assets/logo.png")} />
          </View>
          <View style={styles.carousel}>
            <CarouselCards />
          </View>

          <View style={styles.buttonsContainer}>
            <PurpleButton
              title="Se connecter"
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
            <GreenButton
              title="S'inscrire"
              onPress={() => {
                navigation.navigate("Signup");
              }}
            />
            <Pressable
              onPress={() => {
                navigation.navigate("Discoveries");
              }}
              style={{ marginTop: 10 }}
            >
              <Text>Continuer librement</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </WithBackgroundImage>
  );
};

const windowHeight = Dimensions.get("window").height; // Retrieving window height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    backgroundColor: colors.RGBA,
    width: 300,
    borderRadius: 20,
    maxHeight: windowHeight * 0.8,
  },
  carousel: {
    justifyContent: "center",
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default HomeScreen;
