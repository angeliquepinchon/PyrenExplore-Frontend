import axios from "axios";
import "core-js/stable/atob";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

/**
 * @description Verifies if the JWT token has the correct format with three parts: header, payload, and signature.
 * @param {string} token - The JWT token to validate.
 * @throws {Error} Throws an error if the token does not have the correct format.
 */
const validateTokenFormat = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format");
  }
};

/**
 * @description Decodes the JWT token.
 * @param {string} token - The JWT token to decode.
 * @returns {object} The decoded token payload.
 */
const decodeToken = (token) => jwtDecode(token);

/**
 * @description Checks if the JWT token has expired.
 * @param {object} decodedToken - The decoded JWT token containing the expiration time.
 * @throws {Error} Throws an error if the token has expired.
 */
const checkTokenExpiration = (decodedToken) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decodedToken.exp < currentTimestamp) {
    throw new Error("Token expired");
  }
};

/**
 * @description Stores the JWT token securely in the device's storage.
 * @param {string} token - The JWT token to store.
 * @returns {Promise<{ message: string } | void>} A Promise that resolves when the token is successfully stored, or rejects with an error message if an error occurs.
 */
const storeUserSession = async (token) => {
  try {
    await SecureStore.setItemAsync("user_session", JSON.stringify({ token }));
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    throw new Error(`Failed to store user session: ${error.message}`);
  }
};

/**
 * @description Retrieves the user session with the JWT token.
 * @returns {Promise<{ token: string } | { message: string }>} An object containing the JWT token if the user is authenticated, or an error message.
 */
const retrieveUserSession = async () => {
  try {
    const sessionString = await SecureStore.getItemAsync("user_session");
    if (!sessionString) {
      return { message: "Vous n'êtes pas authentifié." };
    }
    const session = JSON.parse(sessionString);
    const { token } = session;

    validateTokenFormat(token);
    const decodedToken = decodeToken(token);
    checkTokenExpiration(decodedToken);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return { token };
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return {
      message:
        "Une erreur s'est produite lors de la récupération de la session utilisateur.",
    };
  }
};

/**
 * @description Clears the user session by removing the JWT token from storage.
 * @returns {Promise<void>} A Promise that resolves when the token is successfully removed.
 */
const clearUserSession = async () => {
  try {
    await SecureStore.deleteItemAsync("user_session");
    delete axios.defaults.headers.common.Authorization;
  } catch (error) {
    throw new Error(`Failed to clear user session: ${error.message}`);
  }
};

export default { clearUserSession, retrieveUserSession, storeUserSession };
