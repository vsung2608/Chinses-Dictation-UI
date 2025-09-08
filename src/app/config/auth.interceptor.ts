import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, take, switchMap, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

// Biến global để quản lý trạng thái refresh token
let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor start for:', req.url);

  const authService = inject(AuthService);
  const authFreeEndpoints = ['/auth/login', '/auth/register', '/auth/activate'];

  // Bỏ qua auth cho các endpoint không cần xác thực
  if (authFreeEndpoints.some(endpoint => req.url.includes(endpoint))) {
    console.log('Skip auth for:', req.url);
    return next(req);
  }

  // Thêm token vào header nếu có và chưa hết hạn
  const accessToken = authService.getAccessToken();
  if (accessToken && !authService.isTokenExpired()) {
    req = req.clone({
      setHeaders: { 
        'Authorization': `Bearer ${accessToken}` // Sửa từ 'Authentication' thành 'Authorization'
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Chỉ xử lý lỗi 401 (Unauthorized)
      if (error.status === 401 && !authFreeEndpoints.some(endpoint => req.url.includes(endpoint))) {
        return handle401Error(req, next, authService);
      }
      
      return throwError(() => error);
    })
  );
};

function handle401Error(
  req: any, 
  next: any, 
  authService: AuthService
): Observable<any> {
  
  // Nếu đang trong quá trình refresh token, đợi kết quả
  if (isRefreshing) {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        const newReq = req.clone({
          setHeaders: { 'Authorization': `Bearer ${token}` }
        });
        return next(newReq);
      })
    );
  }

  // Bắt đầu quá trình refresh token
  isRefreshing = true;
  refreshTokenSubject.next(null);

  return authService.refresh().pipe(
    switchMap((tokenResponse: any) => {
      if (tokenResponse && tokenResponse.accessToken) {
        const newToken = tokenResponse.accessToken;
        refreshTokenSubject.next(newToken);
        
        // Retry request với token mới
        const newReq = req.clone({
          setHeaders: { 'Authorization': `Bearer ${newToken}` }
        });
        return next(newReq);
      } else {
        // Refresh thất bại, logout user
        authService.logout();
        return throwError(() => new Error('Token refresh failed'));
      }
    }),
    catchError((error) => {
      // Refresh token thất bại
      authService.logout();
      return throwError(() => error);
    }),
    finalize(() => {
      isRefreshing = false;
    })
  );
}