import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private loginService: LoginService,
        private router: Router
      ) {}
    
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.excludeUrls(request.url)) {
          return next.handle(request);
        }
    
        const token = this.loginService.getFullToken();
        
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: token
            }
          });
        }
    
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              this.loginService.clearLocalStorage();
              this.router.navigate(['/login']);
            }
            return throwError(() => error);
          })
        );
      }
    
      private excludeUrls(url: string): boolean {
        const excludedPaths = [
          '/login',
          '/register',
          '/forgot-password'
        ];
        return excludedPaths.some(path => url.includes(path));
      }
}