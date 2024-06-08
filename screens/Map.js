import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconBytton from "../component/UI/IconBytton";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLoacation] = useState();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
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
      {/* مپ ویو که نصب کردیم و در اینجا استفاده کردیم یک اینشیال ولیو میگیرد تا وقتی باز شد محل مورد نظرمان را بدهد و یک فانکشن ان پرس میگیرد که در ان فانکشنی میتوانیم داده هایی ازین مپ که هر کجایش را پرس کردیم دریافت کنیم */}
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
        //میتوانیم ازین مارکر که از همان پکیج نصب شده بالایی ایمپورت شده استفاده کنیم فقط باید از ان مختصاتی که در فانکشن مپ ویو با هر پرس به دست اوردیم در کوردنیت این مارکر استفاده کنیم
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
