import { Text, View } from "react-native";
import WithBackgroundImage from "../../components/WithBackgroundImage";

const UpdateUserScreen = () => {
  return (
    <WithBackgroundImage>
      <View>
        <Text>Hello utilisateur loggé</Text>
      </View>
    </WithBackgroundImage>
  );
};
export default UpdateUserScreen;
