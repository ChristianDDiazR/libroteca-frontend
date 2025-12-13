export interface Rating {
  id: number;
  user_id: number;
  book_id: number;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRatingDto {
  score: number;
}

export interface RatingResponse {
  average: number;
  count: number;
  userRating?: number;
}
