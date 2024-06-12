import { useEffect, useState } from "react";
import PlacesList from "../component/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      if (route.params.checkAddPlace) {
        setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
        route.params.checkAddPlace = false;
      } else {
        setLoadedPlaces(loadedPlaces);
      }
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
