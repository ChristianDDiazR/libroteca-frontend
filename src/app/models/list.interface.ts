import { Book } from './book.interface';

export type ListStatus = 'DESEO_LEER' | 'LEYENDO' | 'LEIDO';

export interface UserBookList {
  user_id: number;
  book_id: number;
  status: ListStatus;
  added_date: string;
  book?: Book;
}

export interface CreateListDto {
  userId: number;
  bookId: number;
  status: ListStatus;
}

export interface UpdateListDto {
  status: ListStatus;
}
