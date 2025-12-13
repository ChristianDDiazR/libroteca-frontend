import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Comment, CreateCommentDto, UpdateCommentDto } from '../../../models/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly API_URL = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getComments(bookId?: number): Observable<Comment[]> {
    let params = new HttpParams();
    if (bookId) {
      params = params.set('book_id', bookId.toString());
    }
    return this.http.get<Comment[]>(this.API_URL, { params });
  }

  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API_URL}/${id}`);
  }

  createComment(comment: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>(this.API_URL, comment);
  }

  updateComment(id: number, comment: UpdateCommentDto): Observable<Comment> {
    return this.http.put<Comment>(`${this.API_URL}/${id}`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
