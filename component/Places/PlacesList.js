import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  const SelectedPlace = (id) => {
    navigation.navigate("PlaceDetail", { places: places, placeId: id });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some !
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={(itemData) => (
        <PlaceItem
          place={itemData.item}
          onSelect={SelectedPlace}
        />
      )}
    />
  );
};

export default PlacesList;
const styles = StyleSheet.create({
  list: {
    margin: 22,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
