import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateRatingDto, RatingResponse } from '../../../models/rating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private readonly API_URL = `${environment.apiUrl}/ratings`;

  constructor(private http: HttpClient) {}

  getRating(bookId: number): Observable<RatingResponse> {
    return this.http.get<RatingResponse>(`${this.API_URL}/${bookId}/rating`);
  }

  createOrUpdateRating(bookId: number, rating: CreateRatingDto): Observable<any> {
    return this.http.post(`${this.API_URL}/${bookId}/rating`, rating);
  }
}
