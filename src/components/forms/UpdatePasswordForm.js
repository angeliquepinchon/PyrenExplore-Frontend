import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

import { useAuth } from "../../context/authContext";
import handleServerError from "../../middelware/errorHandler";
import Colors from "../../utilites/colors";
import CustomAlert from "../CustomAlert";
import PurpleButton from "../buttons/PurpleButton";

const validation = yup
  .object({
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(8, "Le mot de passe doit contenir au minimum 8 caractères")
      .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .matches(
        /[^\w]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        'Ce champ doit correspondre au champ "mot de passe"'
      ),
  })
  .required();

const UpdatePasswordForm = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { authState, login } = useAuth();

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("ok update password");
    } catch (error) {
      handleServerError(error, setIsVisible, setErrorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          accessibilityLabel="Titre de la page: Nouveau mot de passe"
          style={styles.title}
        >
          Nouveau mot de passe
        </Text>
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text
              accessibilityLabel="Champ: Nouveau mot de passe"
              style={styles.label}
            >
              Nouveau mot de passe *
            </Text>
            <TextInput
              aria-label="Nouveau Mot de passe"
              style={[
                styles.input,
                { borderColor: errors.password ? Colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
              accessibilityLabel="Entrez votre nouveau mot de passe"
            />
            {errors.password ? (
              <Text
                accessibilityLabel="Message d'erreur pour le mot de passe"
                style={styles.error}
              >
                {errors.password.message}
              </Text>
            ) : null}
          </View>
        )}
        name="password"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Confirmation du mot de passe *</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.passwordConfirmation
                    ? colors.ERROR
                    : "white",
                },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.trim())}
              value={value}
            />
            {errors.passwordConfirmation ? (
              <Text style={styles.error}>
                {errors.passwordConfirmation.message}
              </Text>
            ) : null}
          </View>
        )}
        name="passwordConfirmation"
        rules={{ required: true }}
      />
      <View style={styles.button}>
        <PurpleButton
          title={"Mise à jour du mot de passe"}
          onPress={handleSubmit(onSubmit)}
          accessibilityLabel="Bouton: Mise à jour du mot de passe"
        />
      </View>

      {errorMessage ? (
        <CustomAlert modalVisible={isVisible} setModalVisible={setIsVisible}>
          <Text
            accessibilityLabel="message d'erreur de connexion"
            style={{ fontWeight: "bold", fontSize: 16 }}
          >
            {errorMessage}
          </Text>
        </CustomAlert>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "center",
    marginTop: 50,
  },
  titleContainer: {
    marginBottom: 80,
  },
  title: {
    justifyContent: "center",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.GREEN,
    fontSize: 20,
  },
  label: {
    color: Colors.DARKGREY,
    marginTop: 20,
    marginLeft: 0,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
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
    color: Colors.ERROR,
    fontWeight: "bold",
  },
});

export default UpdatePasswordForm;
