import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestLogin } from '../../../types/login.response';
import { ResponseSesion } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
 
    const token = this.getAuthToken();
    if (token) {
      this.userSubject.next(token);
    }
  }

  login(credentials: RequestLogin): Observable<ResponseSesion> {
    return this.http.post<ResponseSesion>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: ResponseSesion) => {
          if (response.token) {
            this.setSession(response, credentials.email);
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearLocalStorage();
        })
      );
  }

  private setSession(authResult: ResponseSesion, email: string): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    this.userSubject.next(email);
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSubject.next(null);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getFullToken(): string | null {
    const token = this.getAuthToken();
    return token ? `Bearer ${token}` : null;
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }
}