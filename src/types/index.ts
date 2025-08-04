export interface ApiResponse<T> {
    data: T;
    pagination: {
        total: number;
        limit: number;
        offset: number;
        total_pages: number;
        current_page: number;
        next_url: string;
    };
    config: {
        iiif_url: string;
        website_url: string;
    }
}

export type ArtworkDimension = {
  depth: number;
  width: number;
  height: number;
  diameter: number;
}

export interface ArtworkItemList {
  id: number;
  title: string;
  image_id: string;
  thumbnail?: ArtworkThumbnail;
}

export interface Artwork extends ArtworkItemList {
  description: string;
  artist_title: string;
  place_of_origin: string;
  dimensions: string;
  dimensions_detail: ArtworkDimension;
  medium_display: string;
  material_titles: Array<string>;
}

export interface ArtworkThumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export type RootStackParamList = {
  ArtWorksList: undefined;
  ArtWorkDetails: { id: number };
  FavoriteArtWorks: undefined,
};

