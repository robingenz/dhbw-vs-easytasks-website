import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITasksSortingParams, TaskProperty, SortDirection } from '@app/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

class SortItem {
    title: string = '';
    taskProperty: TaskProperty | 'urgency';
    sortDirection: SortDirection | undefined;

    constructor(title: string, taskProperty: TaskProperty | 'urgency', sortDirection?: SortDirection) {
        this.title = title;
        this.taskProperty = taskProperty;
        this.sortDirection = sortDirection;
    }

    toggleSortDirection(): void {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? undefined : 'asc';
    }

    reset() {
        this.sortDirection = undefined;
    }
}

@Component({
    selector: 'app-sorting-dialog',
    templateUrl: './sorting-dialog.component.html',
    styleUrls: ['./sorting-dialog.component.scss'],
})
export class SortingDialogComponent implements OnInit {
    sortItems = [new SortItem('Tasklist', 'tasklist_id'), new SortItem('Status', 'status'), new SortItem('Urgency', 'urgency')];

    constructor(public dialogRef: MatDialogRef<SortingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ITasksSortingParams) {
        if (!data.orderBy || !data.sortBy || data.orderBy.length !== data.sortBy.length) {
            return;
        }
        for (let y = 0; y < data.sortBy.length; y++) {
            for (let i = 0; i < this.sortItems.length; i++) {
                if (data.sortBy[y] === this.sortItems[i].taskProperty) {
                    this.sortItems[i].sortDirection = data.orderBy[y];
                    moveItemInArray(this.sortItems, i, y);
                }
            }
        }
    }

    public static getNumberOfActiveSortings(sortingSettings: ITasksSortingParams): number {
        if (sortingSettings.orderBy && sortingSettings.orderBy.length > 0) {
            return sortingSettings.orderBy.length;
        }
        return 0;
    }

    ngOnInit() {}

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.sortItems, event.previousIndex, event.currentIndex);
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public resetSortingSettings(): void {
        for (const sortItem of this.sortItems) {
            sortItem.reset();
        }
    }

    public closeDialog(): void {
        const sortingSettings: ITasksSortingParams = {
            sortBy: [],
            orderBy: [],
        };
        for (const sortItem of this.sortItems) {
            if (sortItem.sortDirection !== undefined && sortItem.taskProperty !== undefined) {
                sortingSettings.sortBy ? sortingSettings.sortBy.push(sortItem.taskProperty) : [sortItem.taskProperty];
                sortingSettings.orderBy ? sortingSettings.orderBy.push(sortItem.sortDirection) : [sortItem.sortDirection];
            }
        }
        this.dialogRef.close(sortingSettings);
    }
}
