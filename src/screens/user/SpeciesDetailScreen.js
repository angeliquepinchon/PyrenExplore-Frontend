import { StyleSheet, Text, View } from "react-native";
import DetailCard from "../../components/DetailCard";
import colors from "../../utilites/colors";

const SpeciesDetailScreen = () => {
  return (
    <DetailCard title={"fiche détaillée"}>
      <View>
        <View>
          <Text style={styles.label}>Nom scientifique</Text>
          <Text>ecureil</Text>
        </View>
        <View>
          <View>
            <Text style={styles.label}>Categorie</Text>
            <Text>animale</Text>
          </View>
          <View>
            <Text style={styles.label}>type</Text>
            <Text>mammifère</Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Ou le trouver</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            quos, eligendi officiis odio quae tenetur consectetur alias, magni
            dolores dolore excepturi delectus non ipsam reprehenderit earum?
            Sapiente libero optio quas. Facere quos cupiditate voluptatem magni
            reiciendis veniam ab esse vel quo! Fuga possimus commodi pariatur,
            quaerat suscipit dolor rerum omnis molestias voluptatum provident
            magni reprehenderit est praesentium et sit debitis.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Habitat</Text>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
            laudantium dignissimos architecto illum nesciunt harum quod hic ad
            dicta ea. Porro harum doloremque optio delectus ipsum esse, autem
            ipsa accusantium.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi eos,
            eveniet nihil quasi fuga, et dolorum doloribus autem, explicabo
            magnam at rerum sed porro mollitia repellat voluptas aut eligendi
            eius. Corporis explicabo non voluptatibus laboriosam voluptates
            accusamus dolorum quia tempore dignissimos omnis voluptatum
            temporibus odit cumque voluptas, perspiciatis quas fugiat similique
            libero repellendus! Amet quisquam, error suscipit nihil perspiciatis
            totam.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Comportement</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            esse dicta ullam nemo iure. Et, nihil? Illo, eos voluptas neque a
            et, hic eaque aspernatur fugit nobis sunt voluptate maiores?
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Cycle de vie</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
            dolorem temporibus sunt earum repudiandae! Autem dolor tempora
            corporis aliquam recusandae praesentium. Porro accusantium ab culpa
            reiciendis commodi tenetur deleniti officiis.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>type</Text>
          <Text>mammifère</Text>
        </View>
        <View>
          <Text style={styles.label}>Régime alimentaire</Text>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            delectus debitis blanditiis rem veritatis sequi explicabo impedit
            qui alias, nihil asperiores maxime. Laudantium repudiandae ipsum
            animi in qui recusandae natus!
          </Text>
        </View>
        <View>
          <Text style={styles.label}>type</Text>
          <Text>mammifère</Text>
        </View>
        <View>
          <Text style={styles.label}>Statut</Text>
          <Text>En danger</Text>
        </View>
        <View>
          <Text style={styles.label}>Informarion complémentaires</Text>
          <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>
        </View>
      </View>
    </DetailCard>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.DARKGREY,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SpeciesDetailScreen;
