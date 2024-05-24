import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

import CustomAlert from "../../components/CustomAlert";
import WithBackGroundImage from "../../components/WithBackgroundImage";
import PurpleButton from "../../components/buttons/PurpleButton";
import handleServerError from "../../middelware/errorHandler";
import colors from "../../utilites/colors";

const API_URL = "http://192.168.1.101:3000/v1/passwordReset";
const validation = yup
  .object({
    email: yup
      .string()
      .required("Le champ email est requis")
      .email("L'Email doit être une adresse valide"),
  })
  .required();

const PasswordResetScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data) => {
    if (!data) {
      console.log("Veuillez entrer un email");
    }
    try {
      const response = await axios.post(API_URL, data);
      const token = response.data.token;
    } catch (error) {
      handleServerError(error, setIsVisible, setErrorMessage);
    }
  };

  console.log("errors", errors);

  return (
    <WithBackGroundImage>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mot de passe Oublié ?</Text>
          <Text>
            Entrez votre adresse email pour recevoir un lien sécurisé pour
            changer votre mot de passe.
          </Text>
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                placeholder="paloma@gmail.com"
                style={[
                  styles.input,
                  { borderColor: errors.email ? colors.ERROR : "white" },
                ]}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              {errors.email ? (
                <Text style={styles.error}>{errors.email.message}</Text>
              ) : null}
            </View>
          )}
          name="email"
          rules={{ required: true }}
        />
        <View style={styles.button}>
          <PurpleButton title="Envoyer" onPress={handleSubmit(onSubmit)} />
        </View>
        <Text>Vous n'avez pas de compte ?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("PyrenExplore");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>S'inscrire</Text>
        </Pressable>
        <CustomAlert modalVisible={isVisible} setModalVisible={setIsVisible}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {errorMessage}
          </Text>
        </CustomAlert>
      </View>
    </WithBackGroundImage>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.DARKGREY,
    marginTop: 20,
    marginLeft: 0,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 80,
  },
  title: {
    justifyContent: "center",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 80,
    fontWeight: "bold",
    color: colors.GREEN,
    fontSize: 20,
  },
  container: {
    backgroundColor: colors.RGBA,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
  },
  error: {
    color: colors.ERROR,
    fontWeight: "bold",
  },
});

export default PasswordResetScreen;
