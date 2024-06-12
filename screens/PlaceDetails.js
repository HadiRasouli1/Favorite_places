import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OutlinedButton from "../component/UI/OutlinedButton";
import { Colors } from "../constants/color";

const PlaceDetails = () => {
  const route = useRoute();

  const [placeInfo, setPlaceInfo] = useState({});

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    setPlaceInfo(
      route.params.places.filter((t) => t.id == route.params.placeId)
    );
  }, [selectedPlaceId]);

  const showOnMapHandler = () => {
    console.log(placeInfo);
  };
  if (!placeInfo) {
    return <ActivityIndicator size="large" color="white" />;
  }
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContaner}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}></Text>
        </View>
        <OutlinedButton icon="map" onPressFunc={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContaner: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
