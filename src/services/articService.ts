import { API_BASE_URL, API_ARTWORKS_ENDPOINT, API_ARTWORK_DETAIL_ENDPOINT } from '../constants/api';
import { ApiResponse, Artwork, ArtworkItemList } from '../types';

export const getArtworksList = async (page: number = 1): Promise<ApiResponse<ArtworkItemList[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ARTWORKS_ENDPOINT}?page=${page}&limit=${10}`);
    const data = await response.json();
    return data; // Aquí tendrás que ver la estructura real de la respuesta de la API
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error; // Propagar el error para que la UI lo maneje
  }
};

export const getArtworkById = async (id: string): Promise<ApiResponse<Artwork>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ARTWORK_DETAIL_ENDPOINT(id)}`);
    const data = await response.json();
    return data; // Aquí tendrás que ver la estructura real de la respuesta de la API
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error; // Propagar el error para que la UI lo maneje
  }
};
