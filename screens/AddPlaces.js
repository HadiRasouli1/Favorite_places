import { useState } from "react";
import PlaceForm from "../component/Places/PlaceForm";

const AddPlaces = ({ navigation }) => {
  // const [checkAddPlace, setCheckAddPlace] = useState(false);

  let checkAddPlace = false;
  const createPlaceHandler = (place) => {
    checkAddPlace = true;

    navigation.navigate("AllPlaces", {
      place: place,
      checkAddPlace: checkAddPlace,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
