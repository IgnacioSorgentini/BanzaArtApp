// src/views/FavoriteArtWorks.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArtworkItemList, RootStackParamList } from '../types';
import { getFavoriteArtworks, removeFavoriteArtwork, addFavoriteArtwork } from '../services/favoritesService';
import ArtWorkItem from '../components/ArtWorkItem';
import { TouchableOpacity } from 'react-native';

const FavoriteArtWorks: React.FC = () => {
  const [favorites, setFavorites] = useState<ArtworkItemList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  type FavoriteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FavoriteArtWorks'>;
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  const loadFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedFavorites = await getFavoriteArtworks();
      setFavorites(storedFavorites);
    } catch (error) {
      console.error("Error cargando favoritos en la vista de favoritos:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleFavorite = async (artwork: ArtworkItemList) => {
    const isCurrentlyFavorite = favorites.some(item => item.id === artwork.id);
    if (isCurrentlyFavorite) {
      const updatedFavorites = await removeFavoriteArtwork(artwork.id);
      setFavorites(updatedFavorites);
    } else {
      // Aunque esta pantalla es de favoritos, permitimos añadir si por alguna razón se llega aquí un item no favorito
      const updatedFavorites = await addFavoriteArtwork(artwork);
      setFavorites(updatedFavorites);
    }
  };

  // Cargar favoritos cada vez que la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#b50938" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No tienes obras de arte favoritas aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ArtWorkDetails', { id: item.id })}>
            <ArtWorkItem
              item={item}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true} // Siempre será true en la lista de favoritos
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default FavoriteArtWorks;