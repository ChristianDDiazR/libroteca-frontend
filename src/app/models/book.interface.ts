export interface Book {
  id: number;
  title: string;
  author?: string;
  genre?: string;
  description?: string;
  synopsis?: string;
  cover_image_url?: string;
  average_rating?: number;
  total_ratings?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBookDto {
  title: string;
  author?: string;
  genre?: string;
  description?: string;
  synopsis?: string;
  cover_image_url?: string;
}

export interface UpdateBookDto {
  title?: string;
  author?: string;
  genre?: string;
  description?: string;
  synopsis?: string;
  cover_image_url?: string;
}
