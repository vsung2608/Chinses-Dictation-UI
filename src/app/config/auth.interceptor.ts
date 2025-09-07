import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { BehaviorSubject, catchError, filter, from, of, switchMap, take, throwError } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('authInterceptor start for:', req.url);

  const authService = inject(AuthService);
  const authFreeEndpoints = ['/auth/login', '/auth/register'];

  if (authFreeEndpoints.some(url => req.url.includes(url))) {
    console.log('Skip auth for:', req.url);
    return next(req);
  }

  return authService.getAccessToken().pipe(
    take(1),
    switchMap(token => {
      console.log('Current token:', token);
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }

      if (!authService.willTokenExpireSoon()) {
        console.log('Token still valid → sending request');
        return next(req);
      }

      console.log('Token expiring → refresh flow start');
      return from(authService.refresh()).pipe(
        switchMap(newToken => {
          console.log('Refresh success:', newToken);
          authService.saveTokens(newToken);
          req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken.token}` } });
          return next(req);
        }),
        catchError(error => {
          console.error('Refresh failed:', error);
          authService.logout();
          return throwError(() => error);
        })
      );
    }),
    catchError(error => {
      console.error('Interceptor error:', error);
      return throwError(() => error);
    })
  );
};