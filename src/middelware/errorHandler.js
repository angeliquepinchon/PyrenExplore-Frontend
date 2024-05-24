const handleServerError = (error, setModalVisible, setErrorMessage) => {
  if (error?.response?.data?.message) {
    const errorMessage = error.response.data.message;
    setModalVisible(true);
    setErrorMessage(errorMessage);
  } else {
    setModalVisible(true);
    setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    console.log(error);
  }
};

export default handleServerError;
