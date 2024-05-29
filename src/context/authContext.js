import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  clearUserEmail,
  getCheckStatus,
  getUserEmail,
  storeCheckStatus,
  storeUserEmail,
} from "../service/storeAndGetRememberMe";
import {
  clearUserSession,
  retrieveUserSession,
  storeUserSession,
} from "../service/tokenStorage";

const API_URL = "http://192.168.1.101:3000/v1/login";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isLoading: true,
    email: "",
    checkStatus: false,
  });

  const navigation = useNavigation();

  /**
   * @descritpion - Retrieves and loads the user's email and remember me status from storage. If a token is found in storage, it navigates
   * the user directly to the Discoveries screen.
   * @returns {Promise<void>}
   */
  const loadRememberMe = async () => {
    try {
      const { token } = await retrieveUserSession();
      const { emailValue } = await getUserEmail();
      const { checkValue } = await getCheckStatus();
      setAuthState({
        token,
        isLoading: false,
        email: emailValue,
        checkStatus: checkValue,
      });
      console.log("authState dans authContex.js", { authState });
      if (token) {
        navigation.navigate("Discoveries");
      } else {
        setAuthState({
          token: null,
          isLoading: false,
          email: "",
          checkStatus: false,
        });
      }
    } catch (error) {
      console.error("Error loading remember me data:", error);
      setAuthState({
        token: null,
        isLoading: false,
        email: "",
        checkStatus: false,
      });
    }
  };

  useEffect(() => {
    loadRememberMe();
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      const token = response.data.token;

      if (data.remember) {
        await storeUserEmail(data.email);
        await storeCheckStatus(data.remember);
      } else {
        await clearUserEmail();
        await storeCheckStatus(false);
      }
      await storeUserSession(token);
      setAuthState({
        token,
        isLoading: false,
        email: data.email,
        checkStatus: data.remember,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "Discoveries" }],
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearUserSession();
      setAuthState({
        ...authState,
        token: null,
        isLoading: false,
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
