import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  /**
   * LOGIN
   * Backend should return:
   * {
   *   success: true,
   *   message: "...",
   *   data: User
   * }
   */
  login(data: LoginRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(
      `${this.baseUrl}/users/login`,
      data
    ).pipe(
      tap((response: ApiResponse<User>) => {
        if (response.success && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      })
    );
  }

  /**
   * REGISTER
   */
  register(user: User): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/users/create`,
      user
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}