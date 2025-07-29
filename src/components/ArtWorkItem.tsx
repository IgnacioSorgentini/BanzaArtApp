import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArtworkItemList } from "../types";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from "react-native";
import { GET_ARTIC_IMAGE_URL } from "../constants/api";


interface ArtWorkItemProps {
    item: ArtworkItemList;
    onToggleFavorite: (artwork: ArtworkItemList) => void;
    isFavorite: boolean;
}

const ArtWorkItem: React.FC<ArtWorkItemProps> = ({ item, onToggleFavorite, isFavorite }) => {
    const [loaded, setLoaded] = useState(false);

    const imageSource =
        !item.image_id || !loaded
            ? { uri: item.thumbnail?.lqip }
            : { uri: GET_ARTIC_IMAGE_URL(item.image_id) };

    const handleToggleFavorite = async () => {
        onToggleFavorite(item); // Notifica al componente padre
    };

    return (
        <ImageBackground 
            source={imageSource}
            imageStyle={{ borderRadius: 10 }}
            style={styles.container}
            onLoadEnd={() => setLoaded(true)}
        >
            <View style={styles.favouriteIconContainer}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.artWorkTitle}>{item.title}</Text>
                <Text style={styles.artWorkTitle}>{item.image_id ?? 'no hay'}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        position: 'relative',
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 10,
        backgroundColor: '#b50938',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
    },
    favouriteIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10
    },
    artWorkTitle: {
        color: '#ffffff',
        fontSize: 12
    },
})

export default ArtWorkItem;