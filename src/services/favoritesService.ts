import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArtworkItemList } from '../types';

const FAVORITES_KEY = 'favorites';

export const getFavoriteArtworks = async (): Promise<ArtworkItemList[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading favorites:", e);
    return [];
  }
};

export const saveFavoriteArtworks = async (favorites: ArtworkItemList[]) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving favorites:", e);
  }
};

export const addFavoriteArtwork = async (artwork: ArtworkItemList): Promise<ArtworkItemList[]> => {
  const currentFavorites = await getFavoriteArtworks();
  const isAlreadyFavorite = currentFavorites.some(item => item.id === artwork.id);

  if (!isAlreadyFavorite) {
    const newFavorites = [...currentFavorites, artwork];
    await saveFavoriteArtworks(newFavorites);
    return newFavorites;
  }
  return currentFavorites;
};

export const removeFavoriteArtwork = async (artworkId: number): Promise<ArtworkItemList[]> => {
  const currentFavorites = await getFavoriteArtworks();
  const newFavorites = currentFavorites.filter(item => item.id !== artworkId);
  await saveFavoriteArtworks(newFavorites);
  return newFavorites;
};

export const isArtworkFavorite = async (artworkId: number): Promise<boolean> => {
  const currentFavorites = await getFavoriteArtworks();
  return currentFavorites.some(item => item.id === artworkId);
};