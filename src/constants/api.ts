export const API_BASE_URL = 'https://api.artic.edu/api/v1';
export const API_ARTWORKS_ENDPOINT = '/artworks';
export const API_ARTWORK_DETAIL_ENDPOINT = (id: string) => `/artworks/${id}`;
export const GET_ARTIC_LOW_IMAGE_URL = (imageId: string) => `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`
export const GET_ARTIC_HIGH_IMAGE_URL = (imageId: string) => `https://www.artic.edu/iiif/2/${imageId}/full/full/0/default.jpg`
