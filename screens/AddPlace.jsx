import { StyleSheet } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
    let createPlaceHandler = async (place) => {
        await insertPlace(place);
        navigation.navigate("AllPlaces");
    };

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

const styles = StyleSheet.create({});

export default AddPlace;
