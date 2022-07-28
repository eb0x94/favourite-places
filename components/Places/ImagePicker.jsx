import { Alert, Image, View, Text, StyleSheet } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

const ImagePicker = ({ onImageTaken }) => {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    let verifyPermissions = async () => {
        if (
            cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient permissions!",
                "You need to grant camera permission to use the app."
            );
            return false;
        }

        return true;
    };

    let takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.uri);
        onImageTaken(image.uri);
    };

    let imagePreview = <Text>No image is taken yet.</Text>;

    if (pickedImage) {
        imagePreview = (
            <Image style={styles.image} source={{ uri: pickedImage }} />
        );
    }

    return (
        <View>
            <View style={styles.imageContainer}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Take image
            </OutlinedButton>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
});

export default ImagePicker;
