import { Component, OnInit } from '@angular/core';
import { TaskListService, TaskList, DataUpdateNotificationService } from '@app/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddTaskListDialogComponent, IAddTaskListDialogData } from '../add-task-list-dialog/add-task-list-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { DeleteTaskListDialogComponent } from '../delete-task-list-dialog/delete-task-list-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    taskLists: TaskList[] = [];

    constructor(
        private taskListService: TaskListService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
        private dataUpdateNotificationService: DataUpdateNotificationService,
    ) {}

    ngOnInit() {
        this.init();
    }

    public async init(): Promise<void> {
        this.loadTaskLists();
    }

    public async loadTaskLists(): Promise<void> {
        this.taskLists = await this.taskListService.getTaskLists();
    }

    public openAddTaskListDialog(): void {
        const dialogRef = this.dialog.open(AddTaskListDialogComponent, {
            width: '300px',
            data: { title: '' },
        });
        dialogRef.afterClosed().subscribe((result: IAddTaskListDialogData) => {
            if (!result || !result.title) {
                return;
            }
            this.submitNewTaskList(result.title);
        });
    }

    private async submitNewTaskList(title: string): Promise<void> {
        try {
            await this.taskListService.createTaskList(title);
            await this.loadTaskLists();
            this.snackBar.open('Task list added successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while creating your task list.',
                },
            });
        }
    }

    public openRenameTaskListDialog(taskList: TaskList): void {
        const dialogRef = this.dialog.open(AddTaskListDialogComponent, {
            width: '300px',
            data: { title: taskList.title },
        });
        dialogRef.afterClosed().subscribe((result: IAddTaskListDialogData) => {
            if (!result || !result.title) {
                return;
            }
            taskList.title = result.title;
            this.submitUpdatedTaskList(taskList);
        });
    }

    private async submitUpdatedTaskList(title: TaskList): Promise<void> {
        try {
            await this.taskListService.updateTaskList(title);
            await this.loadTaskLists();
            this.dataUpdateNotificationService.taskListUpdated();
            this.snackBar.open('Task list updated successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while updating your task list.',
                },
            });
        }
    }

    public openDeleteTaskListDialog(taskList: TaskList): void {
        const dialogRef = this.dialog.open(DeleteTaskListDialogComponent, {
            width: '300px',
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (!result) {
                return;
            }
            this.deleteTaskList(taskList);
            this.router.navigate(['dashboard']);
        });
    }

    private async deleteTaskList(taskList: TaskList): Promise<void> {
        try {
            await this.taskListService.deleteTaskListById(taskList.id);
            await this.loadTaskLists();
            this.dataUpdateNotificationService.taskListUpdated();
            this.snackBar.open('Task list deleted successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while deleting your task list.',
                },
            });
        }
    }
}
