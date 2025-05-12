import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

login(email: string, password: string) {
  return this.http.post<{ token: string }>('/api/auth/login', { email, password }).pipe(
    tap(res => {
      localStorage.setItem('auth_token', res.token); // ודא שזה תואם ל-content.service
    })
  );
}


  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
