import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  previousSuccess: Date = new Date();

  constructor(private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: request.url,
      method: request.method,
      headers: this.setCsrfHeader(request.headers),
    });

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          let message = '';
          switch (request.method.toUpperCase()) {
            case 'POST':
              if (response.status === 201) {
                message = 'Item is succesfully created.';
              }
              break;
            case 'PUT':
              if (response.status === 200) {
                message = 'Item is successfully updated.';
              }
              break;
            case 'DELETE':
              if (response.status === 204) {
                message = 'Item is succesfully deleted.';
              }
              break;
          }

          if (message.length > 0) {
            const seconds =
              (new Date().getTime() - this.previousSuccess.getTime()) / 1000;
            if (seconds > 2) {
              // this.messageService.add({
              //   severity: 'success',
              //   summary: 'Success',
              //   detail: message,
              // });
              this.previousSuccess = new Date();
            }
          }
        }
      }),
      map((event) => event),
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          const errors: string[] = [];
          if (err.status === 304) {
            return of((err as unknown) as HttpEvent<any>);
          }
          if (err.status === 400) {
            if (Array.isArray(err.error)) {
              err.error
                .filter((p) => p?.severity === 'Error')
                .forEach((error) => {
                  errors.push(error.message);
                });
            } else if (err.error?.severity === 'Error') {
              errors.push(err.error.message);
            }
          } else if (this.checkExpected401(err, request.url)) {
            return throwError(() => new Error('Not Authorized'));
          } else if (err.status === 401) {
            this.router.navigate(['/notauthorized']);
          } else if (err.status === 403) {
            this.router.navigate(['/notauthorized']);
          } else if (err.status === 404) {
            errors.push('The requested resource does not exist');
          } else if (err.status === 412) {
            errors.push('This resource was already updated by someone else');
          } else if (err.status === 500) {
            errors.push('Something went wrong while processing your request');
          } else {
            errors.push('An unknown error has occured');
            // eslint-disable-next-line
            console.warn(err.message);
          }

          // errors.forEach((error) =>
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: error,
          // })
          // );
          // eslint-disable-next-line
          console.error('Errors', errors);
        }

        return throwError(() => new Error('Request error was intercepted.'));
      })
    );
  }

  private checkExpected401(error: HttpErrorResponse, url: string): boolean {
    return (
      error.status === 401 &&
      (url.includes('/bff/') || url.includes('/users/current'))
    );
  }

  private setCsrfHeader(headers: HttpHeaders): HttpHeaders {
    return headers.set('X-CSRF', '1');
  }
}
