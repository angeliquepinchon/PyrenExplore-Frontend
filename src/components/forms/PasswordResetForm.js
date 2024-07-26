import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as yup from "yup";

import PurpleButton from "../../components/buttons/PurpleButton";
import colors from "../../utilites/colors";

const validation = yup
  .object({
    email: yup
      .string()
      .required("Le champ email est requis")
      .email("L'Email doit être une adresse valide"),
  })
  .required();

const PasswordResetForm = ({ navigation, onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Mot de passe Oublié ?</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.text}>
          Entrez votre adresse email pour recevoir un lien sécurisé pour changer
          votre mot de passe.
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                placeholder="paloma@gmail.com"
                style={[
                  styles.input,
                  {
                    borderColor: errors.email ? colors.ERROR : "white",
                    width: 300,
                  },
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
            navigation.navigate("Signup");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>S'inscrire</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.GREEN,
    fontSize: 20,
  },
  form: {
    alignItems: "center",
  },
  label: {
    color: colors.DARKGREY,
    marginTop: 20,
    marginLeft: 0,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
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
    fontWeight: "bold",
    fontSize: 16,
    color: colors.ERROR,
  },
});

export default PasswordResetForm;
