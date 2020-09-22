import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataUpdateNotificationService {
    private taskUpdateObs: Subject<void> = new Subject();
    private taskListUpdateObs: Subject<void> = new Subject();

    constructor() {}

    public taskUpdated(): void {
        this.taskUpdateObs.next();
    }

    public get taskUpdate$(): Observable<void> {
        return this.taskUpdateObs.asObservable();
    }

    public taskListUpdated(): void {
        this.taskListUpdateObs.next();
    }

    public get taskListUpdate$(): Observable<void> {
        return this.taskListUpdateObs.asObservable();
    }
}
