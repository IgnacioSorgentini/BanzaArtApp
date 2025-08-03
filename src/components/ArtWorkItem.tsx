import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ArtworkItemList } from "../types";
import Ionicons from '@expo/vector-icons/Ionicons';
import { GET_ARTIC_LOW_IMAGE_URL } from "../constants/api";


interface ArtWorkItemProps {
    item: ArtworkItemList;
    onToggleFavorite: (artwork: ArtworkItemList) => void;
    isFavorite: boolean;
}

const ArtWorkItem: React.FC<ArtWorkItemProps> = ({ item, onToggleFavorite, isFavorite }) => {
    const [mainImageLoaded, setMainImageLoaded] = useState(false);

    const thumbnailUrl = item.thumbnail?.lqip;
    const imageUrl = GET_ARTIC_LOW_IMAGE_URL(item.image_id);

    const handleToggleFavorite = async () => {
        onToggleFavorite(item);
    };

    return (
       <View style={styles.container}>
            <Image
                source={{ uri: thumbnailUrl }}
                style={[styles.backgroundImage, { opacity: mainImageLoaded ? 0 : 1 }]}
                resizeMode="cover"
            />
            
            {imageUrl && (
              <Image
                  source={{ uri: imageUrl }}
                  style={[styles.backgroundImage, { opacity: mainImageLoaded ? 1 : 0 }]}
                  resizeMode="cover"
                  onLoad={() => setMainImageLoaded(true)}
              />
            )}

            <View style={styles.favoriteIconContainer}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={25} style={styles.heartButton} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.artWorkTitle}>{item.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
    titleContainer: {
        position: 'absolute',
        maxWidth: '90%',
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

export default memo(ArtWorkItem);