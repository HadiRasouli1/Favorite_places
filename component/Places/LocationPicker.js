import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/color";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const LocationPicker = ({ onPickeLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickeLocation(pickedLocation);
  }, [pickedLocation, onPickeLocation]);
  // const verifyPermissions = async () => {
  //   const [locationPermissionInformation, requestPermission] =
  //     useForegroundPermissions();

  //   if (
  //     locationPermissionInformation.status === PermissionStatus.UNDETERMINED
  //   ) {
  //     const permissionResponse = await requestPermission();
  //     return permissionResponse.granted;
  //   }

  //   if (locationPermissionInformation.status === PermissionStatus.DENIED) {
  //     Alert.alert(
  //       "Insufficient Permissioms!",
  //       "You need to grant location permissions to use this app"
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  const getLocationHandler = async () => {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "error masage for access",
        "Permission to access location was denied"
      );
      return;
    }
    //یک راه حل ساده تر برای پیاده سازی مجوز گرفتن از اندروید و ای او اس فقط باید دو تا مقدار را در اپ دات جیسون اضافه بکنیم
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    return location;
  };
  const pickOnMapHandler = async () => {
    const UserLocation = await getLocationHandler();
    navigation.navigate("Map", { UserLocation: UserLocation });
  };

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
