import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";

import { useAuth } from "../../context/authContext";
import handleServerError from "../../middelware/handleServerError";
import Colors from "../../utilites/colors";
import CustomAlert from "../CustomAlert";
import PurpleButton from "../buttons/PurpleButton";

const validation = yup
  .object({
    email: yup
      .string()
      .required("Le champ identifiant est requis")
      .email("L'identifiant doit être un email valide"),
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
  })
  .required();

const LoginForm = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
      email: authState.email || "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
      reset();
    } catch (error) {
      handleServerError(error, setIsVisible, setErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          accessibilityLabel="Titre de la page: Connexion"
          style={styles.title}
        >
          Connexion
        </Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text accessibilityLabel="Champ: Identifiant" style={styles.label}>
              Identifiant *
            </Text>
            <TextInput
              aria-label="identifiant"
              placeholder="paloma@gmail.com"
              style={[
                styles.input,
                { borderColor: errors.email ? Colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              accessibilityLabel="entrez votre addresse email"
            />
            {errors.email ? (
              <Text
                accessibilityLabel="message d'erreur pour l'adresse email"
                style={styles.error}
              >
                {errors.email.message}
              </Text>
            ) : null}
          </View>
        )}
        name="email"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Text
                accessibilityLabel="Champ: Mot de passe"
                style={styles.label}
              >
                Mot de passe *
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("PasswordReset");
                }}
              >
                <Text>Oublié ?</Text>
              </Pressable>
            </View>
            <TextInput
              aria-label="Mot de passe"
              style={[
                styles.input,
                { borderColor: errors.password ? Colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
              accessibilityLabel="Entrez votre mot de passe"
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
        name="remember"
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <BouncyCheckbox
            isChecked={authState.checkStatus}
            fillColor="green"
            unfillColor="white"
            text="Se souvenir de moi"
            style={{ marginTop: 40 }}
            textStyle={{ color: Colors.DARKGREY, textDecorationLine: "none" }}
            onPress={(isChecked) => {
              onChange(isChecked);
            }}
            accessibilityLabel="Se souvenir de moi"
          />
        )}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            color={Colors.GREEN}
            accessibilityLabel="Chargement en cours"
          />
          <Text accessibilityLabel="Message: Chargement en cours">
            chargement des données...
          </Text>
        </View>
      ) : (
        <View style={styles.button}>
          <PurpleButton
            title={"Se connecter"}
            onPress={handleSubmit(onSubmit)}
            accessibilityLabel="Bouton: Se connecter"
          />
        </View>
      )}

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

export default LoginForm;
