import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface LoginResp {
  token: string;
  user: { id: string; email: string; name?: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  tokenSig = signal<string | null>(this.getToken());

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<LoginResp>(`${this.base}/auth/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<LoginResp>(`${this.base}/auth/register`, { name, email, password });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
    this.tokenSig.set(token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  loggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
    this.tokenSig.set(null);
  }
}
