import { Image, StyleSheet, View, Text, Pressable } from "react-native";

const PlaceItem = ({ place, onSelect }) => {
    return (
        <Pressable onPress={onSelect}>
            <Image src={{ uri: place.imageURI }} />
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    
});

export default PlaceItem;
