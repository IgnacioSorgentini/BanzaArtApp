import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { getArtworksList } from "../services/articService";
import { ArtworkItemList, RootStackParamList } from "../types";
import ArtWorkItem from "../components/ArtWorkItem";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ArtWorksList: React.FC = () => {
    const [artWorks, setArtWorks] = useState<ArtworkItemList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ArtWorksList'>;
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const mergeUniqueArtworks = (prev: ArtworkItemList[], next: ArtworkItemList[]) => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = next.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
    };

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

    const handleLoadMore = async () => {
        if (!isLoadingMore && hasMore) {
          const nextPage = page + 1;
          await fetchArtWorks(nextPage);
          setPage(nextPage);
        }
    };
    

    useEffect(() => {
        fetchArtWorks(1);
    }, [])
    
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList 
                    style={styles.list}
                    data={artWorks} 
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ArtWorkDetails', { id: item.id })}>
                            <ArtWorkItem item={item} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoadingMore ? <ActivityIndicator size="small" /> : null
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 20,
    }
})

export default ArtWorksList;