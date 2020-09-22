import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-task-list-dialog',
    templateUrl: './delete-task-list-dialog.component.html',
    styleUrls: ['./delete-task-list-dialog.component.scss'],
})
export class DeleteTaskListDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<DeleteTaskListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: boolean) {}

    ngOnInit() {}

    public onCancel(): void {
        this.dialogRef.close();
    }

    public closeDialog(data: boolean): void {
        this.dialogRef.close(data);
    }
}
