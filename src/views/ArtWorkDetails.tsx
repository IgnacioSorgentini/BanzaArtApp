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
                                    style={{ width: '100%', height: 300, resizeMode: 'cover', borderRadius: 20 }}
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
                                    {(artWorkInformation.description || '').replace(/<[^>]+>/g, '')}
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