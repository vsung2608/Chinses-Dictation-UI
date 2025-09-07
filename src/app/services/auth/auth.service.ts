import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../../models/Auth';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API Auth
  private static readonly LOGIN_URL: string = 'http://localhost:8080/api/v1/auth/login';
  private static readonly REGISTER_URL: string = 'http://localhost:8080/api/v1/auth/register';
  private static readonly REFRESH_URL: string = 'http://localhost:8080/api/v1/auth/refresh';
  private static readonly LOGOUT_URL: string = 'http://localhost:8080/api/v1/auth/logout';

  constructor(private httpClient: HttpClient, private storageMap: StorageMap) {
  }

  login(username: string, password: string) {
    let request: LoginRequest = { username: username, password: password };

    return this.httpClient.post<TokenResponse>(AuthService.LOGIN_URL, request)
      .pipe(
        tap((res) => this.saveTokens(res))
      );
  }

  register(data: RegisterRequest) {
    this.httpClient.post(AuthService.REGISTER_URL, data);
  }

  logout() {
    this.httpClient.post(AuthService.LOGOUT_URL, {})

    this.storageMap.delete('access_token')
    this.storageMap.delete('expires_at')
  }

  refresh(): Observable<TokenResponse> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const refreshToken: RefreshTokenRequest = { token: token || '' };
        return this.httpClient.post<TokenResponse>(AuthService.REFRESH_URL, refreshToken).pipe(
          tap(res => this.saveTokens(res))
        )
      })
    );
  }

  saveTokens(data: TokenResponse) {
    this.storageMap.set('access_token', data.token).subscribe(() => {
      console.log('Token saved');
    });

    this.storageMap.set('expires_at', data.expiresIn.toString()).subscribe(() => {
      console.log('Token saved');
    });
  }

  getAccessToken(): Observable<string | null> {
    return this.storageMap.get('access_token').pipe(
      map(value => (typeof value === 'string' ? value : null))
    );
  }

  getTokenExpiration(): number {
    return Number(this.storageMap.get('expires_at')) || 0
  }

  isTokenExpired(): boolean {
    return Date.now() >= this.getTokenExpiration()
  }

  willTokenExpireSoon(bufferSeconds = 60): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    const now = Date.now() / 1000;
    return this.getTokenExpiration() - now < bufferSeconds;
  }
}
