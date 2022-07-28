import { useNavigation } from "@react-navigation/native";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
    const navigation = useNavigation();

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No added places, yet. Add some!
                </Text>
            </View>
        );
    }

    let selectPlaceHandler = (id) => {
        navigation.navigate("PlaceDetails", {
            placeId: id,
        });
    };
    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PlaceItem place={item} onSelect={selectPlaceHandler} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
});

export default PlacesList;
