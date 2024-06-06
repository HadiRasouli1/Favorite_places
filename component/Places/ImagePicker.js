import { launchCameraAsync } from "expo-image-picker";
import { Button, View } from "react-native";

const ImagePicker = () => {
  const takeImageHandler = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      // در داخل این که به صورت ابجکتی شکستیم میتوانیم برخی تنظیمات را اضافه کنیم مثل ادیت عکس سایز عکس و کیفیت عکس و ...
    });
    // بعد از نصب امیچ پیکر و قرار دادن برخی اجازه ها در اپ دات جیسون اینجا با استفاده لانچ کمرا ایسینک از ان استفاده کردیم و فانکشنی که هم استفاده کردیم پرامیسی کردیم بعد از گرفتن عکس برخی کار هار بکند چون ممکن است طرف عکسی نندازد در ضمن مجوز هایی که گفتن فقط در اندروید کار کرد زیرا خودش به صورت اتومات انجام میدهد برای ای او اس بعدا به صورت دستی این مجوز هارا ست میکینم تا دوربین کار کند
    // در ضمن ما میتوانستیم از اکسپو کمرا هم استفاده کنیم که به ما امکان شخصی سازی کمرا را میدهد ولی برای گرفتن عکس ساده یا برداشتن عکس از گالری همین امیج پیکر کافی هست
    console.log(image);
  };
  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;
