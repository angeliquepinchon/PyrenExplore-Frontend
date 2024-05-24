import { StyleSheet, View } from "react-native";
import WithBackgroundImage from "../../components/WithBackgroundImage";
import LoginForm from "../../components/forms/LoginForm";
import colors from "../../utilites/colors";

const LoginScreen = ({ navigation }) => {
  return (
    <WithBackgroundImage>
      <View style={styles.container}>
        <LoginForm navigation={navigation} />
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

export default LoginScreen;
