import { Component, OnInit, Input } from '@angular/core';
import { IReport } from '@app/core';

@Component({
    selector: 'app-report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
    @Input() report: IReport | undefined;
    displayedColumns = ['tasklistId', 'tasklistTitle', 'openTasks', 'expiredTasks', 'closedTasks'];

    constructor() {}

    ngOnInit() {}

    public getNumberOfAllOpenedTasks(): number {
        if (!this.report) {
            return 0;
        }
        let numberOfAllOpenedTasks: number = 0;
        for (const taskList of this.report.taskCountPerTasklist) {
            numberOfAllOpenedTasks += taskList.openTasks;
        }
        return numberOfAllOpenedTasks;
    }

    public getNumberOfAllExpiredTasks(): number {
        if (!this.report) {
            return 0;
        }
        let numberOfAllExpiredTasks: number = 0;
        for (const taskList of this.report.taskCountPerTasklist) {
            numberOfAllExpiredTasks += taskList.expiredTasks;
        }
        return numberOfAllExpiredTasks;
    }

    public getNumberOfAllClosedTasks(): number {
        if (!this.report) {
            return 0;
        }
        let numberOfAllClosedTasks: number = 0;
        for (const taskList of this.report.taskCountPerTasklist) {
            numberOfAllClosedTasks += taskList.closedTasks;
        }
        return numberOfAllClosedTasks;
    }
}
