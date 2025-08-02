import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { getArtworkById } from "../services/articService";
import { Artwork } from "../types";
import { GET_ARTIC_IMAGE_URL } from "../constants/api";

interface ArtWorkDetailsProps {
    artWorkId: string;
};

const ArtWorkDetails: React.FC = () => {
    const [artWorkInformation, setArtWorkInformation] = useState<Artwork>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    type ArtWorkDetailsRouteProp = RouteProp<RootStackParamList, 'ArtWorkDetails'>;

    const route = useRoute<ArtWorkDetailsRouteProp>();
    const { id } = route.params;

    const fetchArtworkInformation = async () => {
        setIsLoading(true);
        try {
            const response = await getArtworkById(id.toString());
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
        <ScrollView>
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
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detail}>
                                    Artist: {artWorkInformation.artist_title}
                                </Text>
                                <Text style={styles.detail}>
                                    Place of origin: {artWorkInformation.place_of_origin}
                                </Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image 
                                    source={{ uri:GET_ARTIC_IMAGE_URL(artWorkInformation.image_id) }}
                                    style={{ width: '100%', height: 300, resizeMode: 'cover', borderRadius: 20 }}
                                />
                            </View>
                            {artWorkInformation.description && (
                               <View>
                                    <View style={styles.subtitleContainer}>
                                        <Text style={styles.subtitle}>
                                            Description
                                        </Text>
                                    </View>
                                    <View style={styles.divider} />
                                    <View>
                                        <Text style={styles.text}>
                                                {(artWorkInformation.description || '').replace(/<[^>]+>/g, '')}
                                        </Text>
                                    </View>
                               </View>
                            )}
                            <View style={styles.subtitleContainer}>
                                <Text style={styles.subtitle}>
                                    Characteristics
                                </Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.characteristicContainer}>
                                <Text style={styles.text}>
                                    <span style={styles.characteristicTitle}>Tehnique:</span> {artWorkInformation.medium_display ?? '-'}
                                </Text>
                            </View>
                            <View style={styles.characteristicContainer}>
                                <Text style={styles.text}>
                                    <span style={styles.characteristicTitle}>Materials:</span> {artWorkInformation.material_titles ?? '-'}
                                </Text>
                            </View>
                            <View style={styles.characteristicContainer}>
                                <Text style={styles.text}>
                                    <span style={styles.characteristicTitle}>Dimensions:</span> {artWorkInformation.dimensions ?? '-'}
                                </Text>
                            </View>
                        </View>
                    )
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height,
        backgroundColor: '#FFF9C4',
        flexDirection: 'column',
        alignContent: 'center',
        padding: 20,
    },
    imageContainer: {
        borderRadius: 20,
        width: '100%',
    },
    subtitleContainer: {
        marginTop: 20,
    },
    title: {
        color: '#b50938',
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#b50938',
        fontSize: 25,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    detail: {
        marginRight: 16,
        backgroundColor: '#b50938',
        borderRadius: 10,
        padding: 8,
        color: '#FFF',
    },
    characteristicContainer: {
        marginBottom: 10,
    },
    characteristicTitle: {
        fontWeight: 'bold',
    },
    text: {
        color: '#b50938',
        fontSize: 14,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#b50938',
        marginVertical: 10,
    },
})

export default ArtWorkDetails;