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
    const [imageError, setImageError] = useState(false);

    const placeholderImage = require('../../assets/image-placeholder.svg');
    const imageUrl = item.image_id ? GET_ARTIC_IMAGE_URL(item.image_id) : item.thumbnail?.lqip;

    const imageSource =
    imageError || !item.image_id
        ? item.thumbnail?.lqip
            ? { uri: item.thumbnail.lqip }
            : placeholderImage
        : { uri: imageUrl };

    const handleToggleFavorite = async () => {
        onToggleFavorite(item); // Notifica al componente padre
    };

    return (
        <ImageBackground 
            source={imageSource}
            imageStyle={{ borderRadius: 10 }}
            style={styles.container}
            onLoadEnd={() => setLoaded(true)}
            onError={() => setImageError(true)}
        >
            <View style={styles.favoriteIconContainer}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={25} style={styles.heartButton} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.artWorkTitle}>{item.title}</Text>
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
    favoriteIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10
    },
    artWorkTitle: {
        color: '#ffffff',
        fontSize: 12
    },
    heartButton: {
        color: '#b50938',
    },
})

export default ArtWorkItem;