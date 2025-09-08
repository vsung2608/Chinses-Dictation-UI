import { Injectable } from '@angular/core';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, TokenResponse } from '../../models/Auth';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API Auth
  private static readonly LOGIN_URL: string = 'http://localhost:8080/api/v1/auth/login';
  private static readonly REGISTER_URL: string = 'http://localhost:8080/api/v1/auth/register';
  private static readonly REFRESH_URL: string = 'http://localhost:8080/api/v1/auth/refresh';
  private static readonly LOGOUT_URL: string = 'http://localhost:8080/api/v1/auth/logout';
  private static readonly ACTIVATE_URL: string = 'http://localhost:8080/api/v1/auth/activate';

  constructor(private httpClient: HttpClient, private storage: StorageService) {
  }

  login(username: string, password: string) {
    let request: LoginRequest = { username: username, password: password };

    return this.httpClient.post<TokenResponse>(AuthService.LOGIN_URL, request)
      .pipe(
        tap((res) => this.saveTokens(res))
      );
  }

  register(data: RegisterRequest) {
    return this.httpClient.post(AuthService.REGISTER_URL, data);
  }

  activation(code: string) {
    return this.httpClient.post(`${AuthService.ACTIVATE_URL}?code=${code}`, {});
  }

  logout() {
    this.httpClient.post(AuthService.LOGOUT_URL, {})

    this.storage.removeItem('access_token');
    this.storage.removeItem('expires_at');
  }

  refresh(): Observable<TokenResponse> {
    const refreshTokenRequest: RefreshTokenRequest = { token: this.getAccessToken() || '' };
    return this.httpClient.post<TokenResponse>(AuthService.REFRESH_URL, refreshTokenRequest)
      .pipe(
        tap((res) => this.saveTokens(res))
      );
  }

  saveTokens(data: TokenResponse) {
    const expiresDate = Date.now() + data.expiresIn * 1000;

    this.storage.setItem('access_token', data.token);
    this.storage.setItem('expires_at', expiresDate.toString());
  }

  getAccessToken() {
    return this.storage.getItem('access_token');
  }

  getTokenExpiration(): number {
    return Number(this.storage.getItem('expires_at')) || 0;
  }

  isTokenExpired(): boolean {
    return Date.now() >= this.getTokenExpiration()
  }

  willTokenExpireSoon(bufferSeconds = 60): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    const now = Date.now();
    const expiration = this.getTokenExpiration(); // ms
    const buffer = bufferSeconds * 1000; // convert to ms
    return expiration - now < buffer;
  }
}
