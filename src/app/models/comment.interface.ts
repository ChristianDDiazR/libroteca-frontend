import { User } from './user.interface';

export interface Comment {
  id: number;
  content: string;
  book_id: number;
  user_id: number;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentDto {
  content: string;
  book_id: number;
}

export interface UpdateCommentDto {
  content: string;
}
