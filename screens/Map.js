import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconBytton from "../component/UI/IconBytton";
import { useRoute } from "@react-navigation/native";

const Map = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLoacation] = useState();

  const region = {
    latitude: route.params.UserLocation.coords.latitude,
    longitude: route.params.UserLocation.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLoacation({
      lat: lat,
      lng: lng,
    });
  };
  const savePickedLoacationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "no Location picked!",
        "you have to pick a location(by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconBytton
          icon="save"
          size={24}
          color={tintColor}
          onPressFunc={savePickedLoacationHandler}
        ></IconBytton>
      ),
    });
  }, [navigation, savePickedLoacationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
