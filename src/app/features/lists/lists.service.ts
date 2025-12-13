import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserBookList, CreateListDto, UpdateListDto } from '../../models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private readonly API_URL = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) {}

  getAllLists(): Observable<UserBookList[]> {
    return this.http.get<UserBookList[]>(this.API_URL);
  }

  getUserLists(userId: number): Observable<UserBookList[]> {
    return this.http.get<UserBookList[]>(`${this.API_URL}/${userId}`);
  }

  addBookToList(data: CreateListDto): Observable<UserBookList> {
    return this.http.post<UserBookList>(this.API_URL, data);
  }

  updateListStatus(userId: number, bookId: number, data: UpdateListDto): Observable<UserBookList> {
    return this.http.patch<UserBookList>(`${this.API_URL}/${userId}/${bookId}`, data);
  }

  removeBookFromList(userId: number, bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${userId}/${bookId}`);
  }
}
