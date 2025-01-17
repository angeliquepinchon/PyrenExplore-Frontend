import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserEmail = async (email) => {
  try {
    await AsyncStorage.setItem("email", JSON.stringify(email));
  } catch (error) {
    console.error("Error storing email for remembre me:", error);
  }
};

const getUserEmail = async () => {
  try {
    const emailValue = JSON.parse(await AsyncStorage.getItem("email"));
    return emailValue !== null ? { emailValue } : { emailValue: "" };
  } catch (error) {
    console.error("Error getting stored email fo rmemerme:", error);
    return null;
  }
};

const clearUserEmail = async () => {
  try {
    await AsyncStorage.removeItem("email");
  } catch (error) {
    console.error("Error clearing email from AsyncStorage:", error);
  }
};

const storeCheckStatus = async (value) => {
  try {
    await AsyncStorage.setItem("checkStatus", JSON.stringify(value));
  } catch (error) {
    console.error("Error storing check value for remember me:", error);
  }
};

const getCheckStatus = async () => {
  try {
    const checkValue = JSON.parse(await AsyncStorage.getItem("checkStatus"));
    return checkValue !== null ? { checkValue } : { checkValue: false };
  } catch (error) {
    console.error("Error getting check value for remember me:", error);
    return null;
  }
};

const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.error("Error storing user token for remember me:", error);
  }
};

const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token !== null ? { token } : { token: "" };
  } catch (error) {
    console.error("Error getting user token for remember me:", error);
  }
};

export {
  clearUserEmail,
  getCheckStatus,
  getUserEmail,
  getUserToken,
  storeCheckStatus,
  storeUserEmail,
  storeUserToken,
};
