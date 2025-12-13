import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Achievement } from '../../../models/achievement.interface';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private readonly API_URL = `${environment.apiUrl}/achievements`;

  constructor(private http: HttpClient) {}

  getUserAchievements(userId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.API_URL}/${userId}`);
  }
}
