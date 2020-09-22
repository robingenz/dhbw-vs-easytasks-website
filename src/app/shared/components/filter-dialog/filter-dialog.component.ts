import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TaskList, ITasksFilterParams } from '@app/core';

export interface IFilterDialogData {
    taskListSettings: ITasksFilterParams;
    taskLists: TaskList[];
    isSingleListView: boolean;
}

@Component({
    selector: 'app-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
    selectTaskListsControl = new FormControl(this.data.taskListSettings.tasklist_id);
    selectUrgencyControl = new FormControl(this.data.taskListSettings.urgency);
    selectStatusControl = new FormControl(this.data.taskListSettings.status);
    deadlineFromControl = new FormControl({
        value: this.data.taskListSettings.deadlineFrom,
        disabled: true,
    });
    deadlineToControl = new FormControl({ value: this.data.taskListSettings.deadlineTo, disabled: true });
    limitControl = new FormControl(this.data.taskListSettings.limit);

    constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IFilterDialogData) {}

    public static getNumberOfActiveFilters(filterSettings: ITasksFilterParams, isSingleListView?: boolean): number {
        let numberOfActiveFilters = 0;
        if (filterSettings.tasklist_id && filterSettings.tasklist_id.length > 0 && !isSingleListView) {
            numberOfActiveFilters++;
        }
        if (filterSettings.urgency && filterSettings.urgency.length > 0) {
            numberOfActiveFilters++;
        }
        if (filterSettings.status && filterSettings.status.length > 0) {
            numberOfActiveFilters++;
        }
        if (filterSettings.deadlineFrom) {
            numberOfActiveFilters++;
        }
        if (filterSettings.deadlineTo) {
            numberOfActiveFilters++;
        }
        if (filterSettings.limit) {
            numberOfActiveFilters++;
        }
        return numberOfActiveFilters;
    }

    ngOnInit() {}

    public onCancel(): void {
        this.dialogRef.close();
    }

    public resetFilterSettings(): void {
        if (!this.data.isSingleListView) {
            this.selectTaskListsControl.reset();
        }
        this.selectUrgencyControl.reset();
        this.selectStatusControl.reset();
        this.deadlineFromControl.reset();
        this.deadlineToControl.reset();
        this.limitControl.reset();
    }

    public closeDialog(): void {
        const filterSettings: ITasksFilterParams = {
            tasklist_id: this.selectTaskListsControl.value,
            status: this.selectStatusControl.value,
            urgency: this.selectUrgencyControl.value,
            deadlineFrom: this.deadlineFromControl.value,
            deadlineTo: this.deadlineToControl.value,
            limit: this.limitControl.value,
        };
        this.dialogRef.close(filterSettings);
    }
}
