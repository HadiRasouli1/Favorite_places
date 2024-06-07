import {
  MediaTypeOptions,
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/color";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  // این یوز کمرا پرمیشن به ما دو تا المان میدهد که یکی اطلاعات مجوز عکس رو به ما میدهد  و یکی درخواستی که برای مجوز صادر میشود را هندل میکنه

  const verifyPermision = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // اگر مجز در حالت نامعلومی قرار داشت پایین عمل میکند
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      // اگر مجوز رد شده بود این پایین را انجام میدهد
      Alert.alert(
        "Insufficient Permissioms!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    // اگر هیچکدام از حالت های بالا نبود ترو بر میگرداند که البته امکان ندارد
    return true;
  };
  // این قسمت بالا در واقع برای آی او اس است و در سامسونگ اینها به صورت اتومات تنظیم شده اند
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermision();
    if (!hasPermission) {
      return;
    }
    // در واقع در اینجا گفتیم اگه در ای اوس اجازه صادر نشده از این فانکشن خارج شو

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(image);
    setPickedImage(image.assets[0].uri);
    // ادرس عکسی که انداختیم را در یک استیت ذخیره میکنیم و در قسمت سورس عکس از ان استیت برای نمایش عکس استفاده میکنیم
  };
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
      <OutlinedButton icon="camera" onPressFunc={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
