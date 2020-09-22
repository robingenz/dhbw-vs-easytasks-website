import { Component, OnInit } from '@angular/core';
import { LoadingService, AuthService } from '@app/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
    showProgressBar$: Observable<boolean>;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private loadingService: LoadingService,
        private router: Router,
        private authService: AuthService,
    ) {
        this.showProgressBar$ = this.loadingService.isLoading$.pipe(delay(0));
    }

    ngOnInit() {}

    public isSmallScreen(): boolean {
        return this.breakpointObserver.isMatched('only screen and (max-width: 768px)');
    }

    public async logout(): Promise<boolean> {
        await this.authService.logout();
        return await this.router.navigate(['login']);
    }
}
