import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import DetailCard from "../../components/DetailCard";
import colors from "../../utilites/colors";

const SpeciesDetailScreen = () => {
  const route = useRoute();
  const { species } = route.params;

  return (
    <DetailCard title={"fiche détaillée"} image={species.photo}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{species.name}</Text>
          <Text style={styles.label}>Nom scientifique</Text>
          <Text>{species.scientificName}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Categorie</Text>
          <Text>{species.category}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>type</Text>
          <Text>{species.type}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Ou le trouver</Text>
          <Text>{species.findIt}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Habitat</Text>
          <Text>{species.habitat}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text>{species.description}</Text>
        </View>
        {species.category === "animale" ? (
          <View style={styles.section}>
            <Text style={styles.label}>Comportement</Text>
            <Text>{species.behavior}</Text>
          </View>
        ) : null}
        <View style={styles.section}>
          <Text style={styles.label}>Cycle de vie</Text>
          <Text>{species.lifeCycle}</Text>
        </View>
        {species.category === "animale" ? (
          <View style={styles.section}>
            <Text style={styles.label}>Régime alimentaire</Text>
            <Text>{species.diet}</Text>
          </View>
        ) : null}
        <View style={styles.section}>
          <Text style={styles.label}>Statut</Text>
          <Text>{species.status ? species.status : "inconnu"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Informarions complémentaires</Text>
          <Text>{species.addInformation}</Text>
        </View>
      </View>
      <View
        style={[styles.section, { alignItems: "center", marginBottom: 10 }]}
      >
        <MaterialCommunityIcons
          name="cards-diamond"
          size={24}
          color={colors.GREEN}
        />
      </View>
    </DetailCard>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  titleContainer: {
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    color: colors.GREEN,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    marginTop: 20,
  },
  label: {
    color: colors.DARKGREY,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default SpeciesDetailScreen;
