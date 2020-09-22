import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
    isLoadingSubj: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {}

    public setIsLoading(isLoading: boolean): void {
        this.isLoadingSubj.next(isLoading);
    }

    public getIsLoading(): boolean {
        return this.isLoadingSubj.getValue();
    }

    public get isLoading$(): Observable<boolean> {
        return this.isLoadingSubj.asObservable();
    }
}
