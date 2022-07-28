import { StyleSheet, View, Alert, Image, Text } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";

import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
    useNavigation,
    useRoute,
    useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ onPlaceChosen }) => {
    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        let handleLocation = async () => {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPlaceChosen({ ...pickedLocation, address: address });
            }
        };

        handleLocation();
    }, [pickedLocation, onPlaceChosen]);

    const verifyPermissions = async () => {
        if (
            locationPermissionInformation.status ===
            PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient permissions!",
                "You need to grant location permissions to use the app."
            );
            return false;
        }

        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };

    const pickOnMapHandler = () => {
        navigation.navigate("Map");
    };

    let locationPreview = <Text>No location picked yet.</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.mapPreviewImage}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.action}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Open Map
                </OutlinedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    mapPreviewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
});

export default LocationPicker;
