import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { AuthService } from '../authentication';
import { TokenService } from '../services/token/token.service';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router,
        private httpClient: HttpClient,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('token') || request.url.includes('register')) {
            return next.handle(request);
        }
        let requestClone = request;
        requestClone = this.addAuthorizationHeader(requestClone);
        return next.handle(requestClone).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.handleHttpAuthError(error, request).pipe(
                        catchError((error: HttpErrorResponse) => {
                            this.authService.logout(false);
                            this.router.navigate(['login']);
                            return throwError(error);
                        }),
                    );
                } else {
                    return throwError(error);
                }
            }),
        );
    }

    private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
        const jwt = this.tokenService.getAccessToken();
        if (!jwt) {
            throw new Error('An error has occurred. The access token is missing.');
        }
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + jwt.getEncodedToken(),
        });
        const clonedRequest = request.clone({ headers });
        return clonedRequest;
    }

    private handleHttpAuthError(httpErrorResponse: HttpErrorResponse, request: HttpRequest<any>): Observable<any> {
        return from(
            this.tokenService.refreshAccessToken().then(
                () => {
                    return null;
                },
                error => {
                    return error;
                },
            ),
        ).pipe(
            switchMap(error => {
                if (error) {
                    return throwError(error);
                } else {
                    return this.retryHttpRequest(request);
                }
            }),
        );
    }

    private retryHttpRequest(httpRequest: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.httpClient.request(httpRequest);
    }
}
