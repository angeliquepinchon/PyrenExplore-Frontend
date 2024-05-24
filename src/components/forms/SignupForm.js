import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";

import handleServerError from "../../middelware/errorHandler";
import colors from "../../utilites/colors";
import PurpleButton from "../buttons/PurpleButton";
import CustomAlert from "../CustomAlert";

const API_URL = "http://192.168.1.101:3000/v1/signup";

const validation = yup
  .object({
    lastName: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Le nom doit uniquement comporter des lettres")
      .required("Le champ nom est requis"),
    firstName: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Le Prénom doit uniquement comporter des lettres")
      .required("Le champ Prénom est requis"),
    pseudo: yup
      .string()
      .matches(
        /^[A-Za-z0-9]+$/,
        "Le pseudo doit être une chaine de caractères"
      ),
    email: yup
      .string()
      .required("Le champ email est requis")
      .email("L'email doit être un email valide"),
    password: yup
      .string()
      .required("Le mot de passe est requis")
      .min(
        8,
        "Le mot de passe doit contenir au minimum 8 caractères, un chiffre, une minuscule, une majuscule et un caractère spaécial"
      )
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
    agreedToTerms: yup
      .bool()
      .oneOf([true], "Vous devez accepter les conditions d'utilisation"),
  })
  .required();

const SignupForm = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      lastName: "",
      firstName: "",
      pseudo: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (dataForm) => {
    try {
      const { passwordConfirmation, ...data } = dataForm;
      const payload = {
        ...data,
        consentGivenAt: new Date(),
      };

      const response = await axios.post(API_URL, payload);
      if (response && (response.status === 200 || response.status === 201)) {
        navigation.navigate("Discoveries");
      }
      reset();
    } catch (error) {
      handleServerError(error, setIsVisible, setErrorMessage);
    }
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inscription</Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Nom *</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: errors.lastName ? colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.trim())}
              value={value}
            />
            {errors.lastName ? (
              <Text style={styles.error}>{errors.lastName.message}</Text>
            ) : null}
          </View>
        )}
        name="lastName"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Prénom *</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: errors.firstName ? colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.trim())}
              value={value}
            />
            {errors.firstName ? (
              <Text style={styles.error}>{errors.firstName.message}</Text>
            ) : null}
          </View>
        )}
        name="firstName"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Pseudo *</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: errors.pseudo ? colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.trim())}
              value={value}
            />
            {errors.pseudo ? (
              <Text style={styles.error}>{errors.pseudo.message}</Text>
            ) : null}
          </View>
        )}
        name="pseudo"
        rules={{ required: false }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: errors.email ? colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.toLowerCase().trim())}
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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.label}>Mot de passe *</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: errors.password ? colors.ERROR : "white" },
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value.trim())}
              value={value}
            />
            {errors.password ? (
              <Text style={styles.error}>{errors.password.message}</Text>
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
      <Controller
        name="agreedToTerms"
        control={control}
        defaultValue={false}
        rules={{ required: false }}
        render={({ field: { onChange, value, isChecked, test } }) => (
          <View>
            <BouncyCheckbox
              text="J'accepte les conditions d'utilisation"
              style={styles.checkBox}
              unfillColor="white"
              fillColor={errors.agreedToTerms ? "red" : "green"}
              textStyle={{ color: colors.DARKGREY, textDecorationLine: "none" }}
              isChecked={value}
              onPress={(isChecked) => {
                onChange(isChecked);
              }}
            />
            {errors.agreedToTerms ? (
              <Text style={styles.error}>{errors.agreedToTerms.message}</Text>
            ) : null}
          </View>
        )}
      />

      <View style={styles.button}>
        <PurpleButton onPress={handleSubmit(onSubmit)} title={"S'inscrire"} />
      </View>
      <CustomAlert modalVisible={isVisible} setModalVisible={setIsVisible}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{errorMessage}</Text>
      </CustomAlert>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    color: colors.DARKGREY,
    margin: 5,
    marginLeft: 0,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    justifyContent: "center",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.GREEN,
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    width: "100%",
    marginTop: 80,
  },
  input: {
    backgroundColor: "white",
    borderColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
  },
  checkBox: {
    marginTop: 40,
  },
  error: {
    color: colors.ERROR,
    fontWeight: "bold",
  },
});

export default SignupForm;
