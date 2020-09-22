import { Component, OnInit } from '@angular/core';
import { TaskStatus, DataUpdateNotificationService, TaskService, Task } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
    selector: 'app-task-edit-form',
    templateUrl: './task-edit-form.component.html',
    styleUrls: ['./task-edit-form.component.scss'],
})
export class TaskEditFormComponent implements OnInit {
    task: Task | undefined;
    readonly statusOptions = [{ value: TaskStatus.open, displayValue: 'Open' }, { value: TaskStatus.done, displayValue: 'Done' }];
    readonly priorityOptions = [
        { value: 1, displayValue: '1' },
        { value: 2, displayValue: '2' },
        { value: 3, displayValue: '3' },
        { value: 4, displayValue: '4' },
        { value: 5, displayValue: '5' },
    ];

    constructor(
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog,
        private dataUpdateNotificationService: DataUpdateNotificationService,
    ) {}

    ngOnInit() {
        this.init();
    }

    private async init(): Promise<void> {
        this.activatedRoute.params.subscribe(params => {
            this.taskService.getTaskById(params.id).then(task => {
                this.task = task;
            });
        });
    }

    public async saveTask(task: Task): Promise<void> {
        this.closeSidebar();
        try {
            await this.taskService.updateTask(task);
            this.snackBar.open('Task saved successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while saving your task.',
                },
            });
        }
        this.dataUpdateNotificationService.taskUpdated();
    }

    public async deleteTask(id: number): Promise<void> {
        this.closeSidebar();
        try {
            await this.taskService.deleteTaskById(id);
            this.snackBar.open('Task deleted successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while deleting your task.',
                },
            });
        }
        this.dataUpdateNotificationService.taskUpdated();
    }

    public async closeSidebar(): Promise<boolean> {
        return await this.router.navigate([{ outlets: { sidebar: null } }], {
            relativeTo: this.activatedRoute.parent,
        });
    }
}
