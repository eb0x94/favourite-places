import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";

const PlaceForm = () => {
    const [enteredTitle, setEnteredTitle] = useState();

    let changedTexHandler = (enteredText) => {
        setEnteredTitle(enteredText);
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
                <ImagePicker/>
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
    },
});

export default PlaceForm;
