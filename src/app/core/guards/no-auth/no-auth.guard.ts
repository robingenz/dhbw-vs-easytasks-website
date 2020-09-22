import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/core/authentication';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public async canActivate(): Promise<boolean> {
        const isAuthenticated = await this.authService.isAuthenticated();
        if (isAuthenticated) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }
}
