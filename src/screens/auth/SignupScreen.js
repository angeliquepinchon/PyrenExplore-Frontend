import { ScrollView, StyleSheet, View } from "react-native";
import WithBackgroundImage from "../../components/WithBackgroundImage";
import SignupForm from "../../components/forms/SignupForm";
import colors from "../../utilites/colors";

const SignupScreen = ({ navigation }) => {
  return (
    <WithBackgroundImage>
      <View style={styles.container}>
        <ScrollView>
          <SignupForm navigation={navigation} />
        </ScrollView>
      </View>
    </WithBackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.RGBA,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
});

export default SignupScreen;
