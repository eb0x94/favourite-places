import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const { StyleSheet } = require("react-native");

const AllPlaces = ({ route }) => {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        let loadPlaces = async () => {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        };

        if (isFocused) {
            loadPlaces();
            // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
        }
    }, [isFocused]);

    return <PlacesList places={loadedPlaces} />;
};

const styles = StyleSheet.create({});

export default AllPlaces;
