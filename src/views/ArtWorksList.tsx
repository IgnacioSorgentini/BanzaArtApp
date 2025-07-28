import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { getArtworksList } from "../services/articService";
import { ArtworkItemList } from "../types";
import ArtWorkItem from "../components/ArtWorkItem";

const ArtWorksList: React.FC = () => {
    const [artWorks, setArtWorks] = useState<ArtworkItemList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchArtWorks = async () => {
        setIsLoading(true);
        try {
            const response = await getArtworksList();
            if (response && response.data) {
                setArtWorks(response.data);
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
        fetchArtWorks();
    }, [])
    
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList 
                    style={styles.list}
                    data={artWorks} 
                    renderItem={({item}) => <ArtWorkItem item={item} />} 
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