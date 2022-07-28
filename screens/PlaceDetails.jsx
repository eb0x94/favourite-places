import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
    let selectedPlaceID = route.params.placeId;
    let [placeDetails, setPlaceDetails] = useState();
    useEffect(() => {
        let fetchedPlace = async () => {
            const place = await fetchPlaceDetails(selectedPlaceID);
            setPlaceDetails(place);
            navigation.setOptions({
                title: place.title,
            });
        };

        fetchedPlace();
    }, [selectedPlaceID]);

    let showOnMapHandler = () => {
        navigation.navigate("Map", {
            initialLat: placeDetails.location.lat,
            initialLng: placeDetails.location.lng,
        });
    };

    if (!placeDetails) {
        return (
            <View style={styles.fallbackStyle}>
                <Text style={styles.fallbackText}>Loading place data...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: placeDetails.imageUri }}
            />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>
                        {placeDetails.address}
                    </Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: "35%",
        minHeight: 350,
        width: "100%",
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding: 20,
    },
    addressText: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
    },
    fallbackStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.accent500,
    },
});

export default PlaceDetails;
