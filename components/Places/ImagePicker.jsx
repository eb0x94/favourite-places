import { Alert, Button, View } from "react-native";
import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";

const ImagePicker = () => {
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
        console.log(image);
    };

    return (
        <View>
            <View></View>
            <Button title="Take image" onPress={takeImageHandler} />
        </View>
    );
};

export default ImagePicker;
