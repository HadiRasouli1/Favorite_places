import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/color";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { useState } from "react";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const [locationPermissionInformation, requestPermission] =
      useForegroundPermissions();

    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissioms!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  };
  // در لوکیشن برای هر دو پلتفورم اجازه گرفتن دستی نیاز است و همان کار های اجازه برای عکس ایفونی که قبلا انجام دادیم را اینبار برای لوکیشن هر دو پلتفورم استفاده میکنیم

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const pickOnMapHandler = () => {};

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: "همون ای پی ایی که از گوگل مپ دریافت کردیم و لت و لانگ خودمان ازینجا استخراج کردیم را بهش  دادیم و در اون ادرس اچ تی تی پی قرار دادیم ",
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton onPressFunc={getLocationHandler} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onPressFunc={pickOnMapHandler} icon="map">
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
