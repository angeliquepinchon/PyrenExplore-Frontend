import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  clearUserEmail,
  getCheckStatus,
  getUserEmail,
  getUserToken,
  storeCheckStatus,
  storeUserEmail,
  storeUserToken,
} from "../service/storeAndGetRememberMe";
import tokenStorage from "../service/tokenStorage";

const API_URL = "http://192.168.1.101:3000/v1/login";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isLoading: true,
  });

  const navigation = useNavigation();

  /**
   * @descritpion - Retrieves and loads the user's email and remember me status from storage. If a token is found in storage, it navigates
   * the user directly to the Discoveries screen.
   * @returns {Promise<void>}
   */
  const loadRememberMe = async () => {
    try {
      const { emailValue } = await getUserEmail();
      const { checkValue } = await getCheckStatus();
      const { token } = await getUserToken();

      if (token) {
        tokenStorage.storeUserSession(token);
        setAuthState({ token, isLoading: false });
        navigation.navigate("Discoveries");
      } else {
        setAuthState({ token: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error loading remember me data:", error);
      setAuthState({ token: null, isLoading: false });
    }
  };

  useEffect(() => {
    loadRememberMe();
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      const token = response.data.token;
      tokenStorage.storeUserSession(token);
      setAuthState({ token, isLoading: false });
      if (data.remember) {
        await storeUserEmail(data.email);
        await storeCheckStatus(data.remember);
        await storeUserToken(token);
      } else {
        await clearUserEmail();
        await storeCheckStatus(false);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "Discoveries" }],
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await tokenStorage.clearUserSession();
    setAuthState({ token: null, isLoading: false });
    navigation.navigate("Home");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
