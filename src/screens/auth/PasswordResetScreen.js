import axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import CustomAlert from "../../components/CustomAlert";
import WithBackGroundImage from "../../components/WithBackgroundImage";
import PasswordResetForm from "../../components/forms/PasswordResetForm";
import handleServerError from "../../middelware/handleServerError";
import colors from "../../utilites/colors";

const API_URL = "http://192.168.1.101:3000/v1/passwordReset";

const PasswordResetScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      if (response.data.success) {
        showMessage({
          message: response.data.message,
          type: "success",
          backgroundColor: colors.GREEN,
        });
      }
    } catch (error) {
      handleServerError(error, setIsVisible, setErrorMessage);
    }
  };
  return (
    <WithBackGroundImage>
      <View style={styles.container}>
        <PasswordResetForm navigation={navigation} onSubmit={handleSubmit} />
      </View>

      <CustomAlert modalVisible={isVisible} setModalVisible={setIsVisible}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </CustomAlert>
    </WithBackGroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.RGBA,
    height: "100%",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
});

export default PasswordResetScreen;
