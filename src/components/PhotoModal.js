import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utilites/colors";

const PhotoModal = ({ visible, onClose }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const status = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        setCameraPermission(false);
      } else {
        setCameraPermission(true);
      }
    } catch (error) {
      console.log(error);
      console.warn(error);
    }
  };

  const AccessGalleryOnPress = async () => {
    console.log("gallery press");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.close}>
          <TouchableOpacity onPress={onClose}>
            <Entypo name="cross" size={30} color={colors.DARKGREY} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={requestCameraPermission}>
            <View style={styles.button}>
              <Text style={styles.title}>Prendre une photo</Text>
              <MaterialCommunityIcons
                name="camera-enhance"
                size={80}
                color={colors.DARKGREY}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={AccessGalleryOnPress}>
            <View style={styles.button}>
              <Text style={styles.title}>Importer une photo</Text>
              <MaterialCommunityIcons
                name="import"
                size={80}
                color={colors.DARKGREY}
              />
            </View>
          </TouchableOpacity>
          {cameraPermission ? (
            <Camera
              type={Camera.Constants.Type.back}
              ref={(ref) => setCamera(ref)}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 70,
    flex: 10,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
  },
  close: {
    alignSelf: "flex-end",
    padding: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PhotoModal;
