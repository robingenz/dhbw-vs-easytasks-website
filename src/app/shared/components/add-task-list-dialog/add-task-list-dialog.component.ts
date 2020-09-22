import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IAddTaskListDialogData {
    title: string;
}

@Component({
    selector: 'app-add-task-list-dialog',
    templateUrl: './add-task-list-dialog.component.html',
    styleUrls: ['./add-task-list-dialog.component.scss'],
})
export class AddTaskListDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<AddTaskListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IAddTaskListDialogData) {}

    ngOnInit() {}

    public onCancel(): void {
        this.dialogRef.close();
    }

    public closeDialog(data: IAddTaskListDialogData): void {
        this.dialogRef.close(data);
    }
}
