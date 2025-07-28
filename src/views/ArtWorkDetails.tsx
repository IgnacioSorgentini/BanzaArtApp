import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet } from "react-native";
import { getArtworkById } from "../services/articService";
import { Artwork } from "../types";
import { GET_ARTIC_IMAGE_URL } from "../constants/api";

interface ArtWorkDetailsProps {
    artWorkId: string;
};

const ArtWorkDetails: React.FC = () => {
    const [artWorkInformation, setArtWorkInformation] = useState<Artwork>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchArtworkInformation = async () => {
        setIsLoading(true);
        try {
            const response = await getArtworkById('161');
            if (response && response.data) {
                setArtWorkInformation(response.data);
            }
        }
        catch(err: any) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworkInformation();
    }, []);

    return(
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                artWorkInformation && (
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>
                                {artWorkInformation?.title}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text>
                                Artist: {artWorkInformation.artist_title}
                            </Text>
                            <Text>
                                Place of origin: {artWorkInformation.place_of_origin}
                            </Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{ uri:GET_ARTIC_IMAGE_URL(artWorkInformation.image_id) }}
                                style={{ width: '100%', height: 300, resizeMode: 'contain', borderRadius: 20 }}
                            />
                        </View>
                        <View>
                            <Text style={styles.subtitle}>
                                Description
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.text}>
                                {artWorkInformation.description.replace(/<[^>]+>/g, '')}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.subtitle}>
                                Characteristics
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.text}>
                                Tehnique: {artWorkInformation.medium_display}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Materials: {artWorkInformation.material_titles}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Dimensions: {artWorkInformation.dimensions}
                            </Text>
                        </View>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b50938',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
    },
    imageContainer: {
        borderRadius: 20,
        width: '100%',
    },
    title: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 10,
      },
})

export default ArtWorkDetails;