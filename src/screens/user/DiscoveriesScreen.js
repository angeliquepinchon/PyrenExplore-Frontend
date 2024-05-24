import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Filter from "../../components/Filter";
import PhotoModal from "../../components/PhotoModal";
import SearchBar from "../../components/SearchBar";
import WithBackgroundImage from "../../components/WithBackgroundImage";
import ActionButton from "../../components/buttons/ActionButton";
import ResetButton from "../../components/buttons/ResetButton";
import colors from "../../utilites/colors";
import speciesTypes from "../../utilites/speciesTypes";

const API_URL = "http://192.168.1.101:3000/v1/species";

const DiscoveriesScreen = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [species, setSpecies] = useState(null);
  const [originalSpecies, setOriginalSpecies] = useState(null);
  const [inputValue, setInputValue] = useState("renard");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get(API_URL);
        setSpecies(response.data);
        setOriginalSpecies(response.data);
      } catch (error) {
        console.log("Error Server : ", error);
      }
    };
    fetchSpeciesData();
  }, []);
  /**
   * This function is called when the user types in the searchBar and updates the value
   * @param {string} textInput - The input text provided by the user
   * @return {void}
   */
  const onChangeText = (textInput) => {
    setInputValue(textInput);
  };

  /**
   This function filters species based on the input value and updates the species list.
 * @param {string} inputValue - The value of the input text.
   */
  const handleSearchBar = (inputValue) => {
    if (!inputValue.trim()) {
      setSpecies(originalSpecies);
      return;
    }
    const filterSpeciesName = species.filter((element) =>
      element.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSpecies(filterSpeciesName);

    if (filterSpeciesName.length === 0) {
      setErrorMessage("Aucune espèce n'a été trouvées");
      resetSpecies();
    } else {
      setErrorMessage("");
    }
  };

  /**
   * Filters species based on the specified type and updates the species list.
   * @param {string} type - The type of species to filter.
   * @returns {void}
   */
  const filterSpeciesByType = (selectedType) => {
    const removeAccents = (word) => {
      return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    // Filter species based on selectedType
    const filteredSpecies = species.filter((speciesElement) => {
      const speciesTypeWithoutAccents = removeAccents(speciesElement.type);
      return (
        speciesTypeWithoutAccents.toUpperCase() ===
        removeAccents(selectedType).toUpperCase()
      );
    });

    if (filteredSpecies.length === 0) {
      setErrorMessage("Aucune espèce n'a été trouvées");
    }
    // Update species state variable with filtered species
    setSpecies(filteredSpecies);
  };

  /**
   * Resets the displayed species to the original list.
   * @returns {void}
   */
  const resetSpecies = () => {
    setSpecies(originalSpecies);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <WithBackgroundImage>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Découvrire la biodiversité</Text>
        </View>
        <SearchBar
          value={inputValue}
          onChangeText={onChangeText}
          validate={handleSearchBar}
        />
        <View>
          <Text id="errorMessage">{errorMessage}</Text>
        </View>
      </View>
      <View style={styles.imagesContainer}>
        <View style={styles.containerButton}>
          <Filter
            onTypeSelected={filterSpeciesByType}
            type={speciesTypes}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
          <ResetButton
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onReset={resetSpecies}
            setMessage={setErrorMessage}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.imagesContent}>
            {species &&
              species.map((element) => {
                return (
                  <TouchableOpacity
                    key={element.id}
                    onPress={() =>
                      navigation.navigate("Detail", { species: element })
                    }
                  >
                    <Image
                      style={styles.tinyImage}
                      source={{
                        uri: element.photo,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={styles.actionButton}>
            <ActionButton title="Faire ma découverte" openModal={openModal} />
          </View>
        </View>
      </View>
      <PhotoModal visible={modalVisible} onClose={closeModal} />
    </WithBackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.GREEN,
    fontSize: 20,
    marginTop: 80,
    marginBottom: 50,
  },
  imagesContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.RGBA,
    borderTopRightRadius: 57,
    borderTopLeftRadius: 57,
    padding: 50,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagesContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
  },
  tinyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  actionButton: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default DiscoveriesScreen;
