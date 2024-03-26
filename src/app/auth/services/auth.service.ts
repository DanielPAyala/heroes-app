import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser() {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // http.post('login', {email, password});

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', 'asdfC4asS4a218saDAs'))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
