import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.setIsLoading(true);
        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.loadingService.setIsLoading(false);
                    }
                },
                error => {
                    this.loadingService.setIsLoading(false);
                },
            ),
        );
    }
}
