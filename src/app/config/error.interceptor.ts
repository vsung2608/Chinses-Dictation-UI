import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      if (error.error instanceof ErrorEvent) {
        message = "Lỗi phía client";
      } else {
        if (typeof error.error === 'string') {
          message = error.error;
        } else {
          message = "Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau";
        }
      }
      messageService.add({ severity: 'warn', summary: 'Hệ thống', detail: message, life: 3000 })
      return throwError(() => new Error("Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau"))
    })
  )
}