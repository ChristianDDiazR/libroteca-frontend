import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UpdateUserDto } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(username?: string): Observable<User[]> {
    let params = new HttpParams();
    if (username) {
      params = params.set('username', username);
    }
    return this.http.get<User[]>(this.API_URL, { params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  updateUser(id: number, data: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/${id}`, data);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
