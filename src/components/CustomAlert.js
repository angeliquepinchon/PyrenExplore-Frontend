import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../utilites/colors";

const CustomAlert = ({ modalVisible, setModalVisible, children }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Erreur</Text>
            {children}
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  title: {
    textTransform: "uppercase",
    fontSize: 20,
    marginBottom: 10,
    color: Colors.ERROR,
  },
  text: {
    backgroundColor: Colors.ERROR,
    padding: 5,
    color: "white",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomAlert;
