import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserCredentials, UserResponse } from '../models/user-model';
import { delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  constructor() {}

  register(user: UserCredentials) {
    return this.http.post<UserResponse>(`${environment.apiUrl}/users/register`, user).pipe(
      delay(1000),
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      }),
    );
  }
  login(email: string, password: string) {
    return this.http
      .post<UserResponse>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(
        delay(1000),
        tap({
          next: (data) => console.log(data),
          error: (err) => console.log(err),
        }),
      );
  }
  isLoggedIn() {
    return this.http.get<UserResponse>(`${environment.apiUrl}/users/me`).pipe(
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      }),
    );
  }
}
