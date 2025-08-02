import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, useWindowDimensions, ListRenderItemInfo } from "react-native";
import { getArtworksList } from "../services/articService";
import { ArtworkItemList, RootStackParamList } from "../types";
import ArtWorkItem from "../components/ArtWorkItem";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isArtworkFavorite, addFavoriteArtwork, getFavoriteArtworks, removeFavoriteArtwork } from "../services/favoritesService";

const ArtWorksList: React.FC = () => {
    const [artWorks, setArtWorks] = useState<ArtworkItemList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

    type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArtWorksList'>;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const MemoArtWorkItem = memo(ArtWorkItem);

    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 2 : 1;

    const mergeUniqueArtworks = (prev: ArtworkItemList[], next: ArtworkItemList[]) => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = next.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
    };

    const loadFavorites = useCallback(async () => {
        const favorites = await getFavoriteArtworks();
        const ids = new Set(favorites.map(item => item.id));
        setFavoriteIds(ids);
    }, []);
    

    const fetchArtWorks = async (pageNumber: number) => {
        if (pageNumber === 1) {
            setIsLoading(true);
        } else {
            setIsLoadingMore(true);
        }

        try {
            const response = await getArtworksList(pageNumber);
            if (response && response.data) {
                if (pageNumber === 1) {
                    setArtWorks(response.data);
                } else {
                    setArtWorks((prev) => mergeUniqueArtworks(prev, response.data));
                }
            }

            const totalPages = response.pagination.total_pages;
            setHasMore(pageNumber < totalPages)
        }
        catch(err: any) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleLoadMore = useCallback(async () => {
        // Si la lista aún no tiene elementos, la carga inicial ya se está manejando.
        // Evitamos el bucle infinito que se dispara al principio.
        if (artWorks.length === 0) {
        return;
        }

        if (!isLoadingMore && hasMore) {
        const nextPage = page + 1;
        await fetchArtWorks(nextPage);
        setPage(nextPage);
        }
    }, [isLoadingMore, hasMore, page, artWorks.length, fetchArtWorks]);

    const handleToggleFavorite = useCallback(async (artwork: ArtworkItemList) => {
        const isCurrentlyFavorite = favoriteIds.has(artwork.id);
        let updatedFavorites: Set<number>;
    
        if (isCurrentlyFavorite) {
          await removeFavoriteArtwork(artwork.id);
          updatedFavorites = new Set(favoriteIds);
          updatedFavorites.delete(artwork.id);
        } else {
          await addFavoriteArtwork(artwork);
          updatedFavorites = new Set(favoriteIds);
          updatedFavorites.add(artwork.id);
        }
        setFavoriteIds(updatedFavorites);
    }, [favoriteIds]);

    const renderArtworkItem = useCallback(({ item }: ListRenderItemInfo<ArtworkItemList>) => {
    return (
        <TouchableOpacity style={numColumns > 1 ? styles.itemContainer : undefined} onPress={() => navigation.navigate('ArtWorkDetails', { id: item.id })}>
            <MemoArtWorkItem onToggleFavorite={handleToggleFavorite} isFavorite={favoriteIds.has(item.id)} item={item} />
        </TouchableOpacity>
    );
}, [navigation, numColumns, handleToggleFavorite, favoriteIds]); // Dependencias importantes
    

    useEffect(() => {
        fetchArtWorks(1);
    }, [])

    useFocusEffect(
        useCallback(() => {
          loadFavorites();
        }, [loadFavorites])
    );
    
    return (
        <View style={styles.listContainer}>
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#b50938" />
                </View>
            ) : (
                <FlatList 
                    style={styles.list}
                    numColumns={numColumns}
                    key={numColumns}
                    data={artWorks.filter(item => item.image_id !== null)} 
                    renderItem={renderArtworkItem}
                    ListEmptyComponent={
                        <Text>No se encontraron obras de arte.</Text>
                    }
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="small" color="#b50938" />
                            </View>
                        ) : null
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 20,
        backgroundColor: '#FFF9C4',
    },
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        flex: 0.50,
        margin: 4,
    },
    loaderContainer: {
        backgroundColor: '#FFF9C4',
        flex: 1,
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ArtWorksList;