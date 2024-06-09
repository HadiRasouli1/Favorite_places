import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/color";

const PlacesList = ({ plases }) => {
  if (!plases || plases.length === 0) {
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
      data={plases}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={(itemData) => <PlaceItem place={itemData.item} />}
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
