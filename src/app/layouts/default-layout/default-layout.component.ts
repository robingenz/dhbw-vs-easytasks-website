import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@app/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
    showProgressBar$: Observable<boolean>;

    constructor(private loadingService: LoadingService) {
        this.showProgressBar$ = this.loadingService.isLoading$;
    }

    ngOnInit() {}
}
