import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({ onCreatePlace }) => {
    const [enteredTitle, setEnteredTitle] = useState();
    const [takenImage, setTakenImage] = useState();
    const [chosenPlace, setChosenPlace] = useState();

    let changedTexHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    };

    let takenImageHandler = (imageUri) => {
        setTakenImage(imageUri);
    };

    const chosenPlaceHandler = useCallback((place) => {
        setChosenPlace(place);
    }, []);

    let savePlaceHandler = () => {
        const placeData = new Place(enteredTitle, takenImage, chosenPlace);
        onCreatePlace(placeData);
    };

    return (
        <ScrollView style={styles.formContainer}>
            <View>
                <Text style={styles.titleText}>Title</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={changedTexHandler}
                    value={enteredTitle}
                />
                <ImagePicker onImageTaken={takenImageHandler} />
                <LocationPicker onPlaceChosen={chosenPlaceHandler} />
                <Button onPress={savePlaceHandler}>Save favourite place</Button>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 24,
    },
    titleText: {
        fontWeight: "bold",
        marginBottom: 12,
        color: Colors.primary500,
    },
    inputText: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
});

export default PlaceForm;
