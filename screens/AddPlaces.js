import PlaceForm from "../component/Places/PlaceForm";

const AddPlaces = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate("AllPlaces", {
      place: place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
