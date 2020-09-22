import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    TaskStatus,
    TaskListService,
    DataUpdateNotificationService,
    TaskService,
    Task,
    TaskList,
    ITasksFilterParams,
    ITasksSortingParams,
} from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent, FilterDialogComponent } from '@app/shared';
import { SortingDialogComponent } from '@app/shared/components/sorting-dialog/sorting-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    taskList: TaskList | undefined;
    addTaskInputValue: string = '';
    tasksFilterSettings: ITasksFilterParams = {};
    tasksSortingSettings: ITasksSortingParams = {};
    destroy$: Subject<void> = new Subject();

    constructor(
        private taskListService: TaskListService,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog,
        private dataUpdateNotificationService: DataUpdateNotificationService,
        private taskService: TaskService,
    ) {}

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private async init(): Promise<void> {
        this.activatedRoute.params.subscribe(params => {
            this.tasksFilterSettings = {
                tasklist_id: [params.id],
            };
            this.tasksSortingSettings = {};
            this.loadTaskListByIdWithTasks(params.id);
        });
        this.dataUpdateNotificationService.taskUpdate$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.taskService.getTasks(this.tasksFilterSettings, this.tasksSortingSettings).then(tasks => {
                if (!this.taskList) {
                    return;
                }
                this.taskList.tasks = tasks;
            });
        });
        this.dataUpdateNotificationService.taskListUpdate$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (!this.taskList) {
                return;
            }
            this.taskListService.getTaskList(this.taskList.id).then(taskList => {
                if (this.taskList) {
                    this.taskList.title = taskList.title;
                }
            });
        });
    }

    private async loadTaskListByIdWithTasks(taskListId: number): Promise<void> {
        try {
            const taskList = await this.taskListService.getTaskList(taskListId, true);
            this.taskList = taskList;
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while loading your task list.',
                },
            });
        }
    }

    public async submitNewTask(): Promise<void> {
        if (!this.taskList || !this.addTaskInputValue) {
            return;
        }
        try {
            await this.taskService.createTask(this.addTaskInputValue, this.taskList.id);
            this.dataUpdateNotificationService.taskUpdated();
            this.addTaskInputValue = '';
            this.snackBar.open('Task added successfully.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while creating your task.',
                },
            });
        }
    }

    public async openTaskDetails(task: Task): Promise<boolean> {
        return await this.router.navigate([{ outlets: { sidebar: ['task', task.id] } }], {
            relativeTo: this.activatedRoute.parent,
        });
    }

    public async closeTaskDetails(): Promise<boolean> {
        return await this.router.navigate([{ outlets: { sidebar: null } }], {
            relativeTo: this.activatedRoute.parent,
        });
    }

    public async markTaskAsDone(task: Task): Promise<void> {
        if (!this.taskList) {
            return;
        }
        task.status = TaskStatus.done;
        try {
            await this.taskService.updateTask(task);
            this.snackBar.open('Task marked as done.', undefined, { duration: 4000 });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'An error occurred while saving your task.',
                },
            });
        }
        this.closeTaskDetails();
        this.dataUpdateNotificationService.taskUpdated();
    }

    public openFilterDialog(filterSettings: ITasksFilterParams, taskLists: TaskList[]): void {
        const dialogRef = this.dialog.open(FilterDialogComponent, {
            width: '800px',
            data: {
                taskListSettings: filterSettings,
                taskLists: taskLists,
                isSingleListView: true,
            },
        });
        dialogRef.afterClosed().subscribe((updatedFilterSettings: ITasksFilterParams) => {
            if (!updatedFilterSettings) {
                return;
            }
            this.tasksFilterSettings = updatedFilterSettings;
            this.dataUpdateNotificationService.taskUpdated();
        });
    }

    public getNumberOfActiveFilters(filterSettings: ITasksFilterParams): number {
        return FilterDialogComponent.getNumberOfActiveFilters(filterSettings, true);
    }

    public openSortingDialog(sortingSettings: ITasksSortingParams): void {
        const dialogRef = this.dialog.open(SortingDialogComponent, {
            width: '400px',
            data: sortingSettings,
        });
        dialogRef.afterClosed().subscribe((updatedSortingSettings: ITasksSortingParams) => {
            if (!updatedSortingSettings) {
                return;
            }
            this.tasksSortingSettings = updatedSortingSettings;
            this.dataUpdateNotificationService.taskUpdated();
        });
    }

    public getNumberOfActiveSortings(sortingSettings: ITasksSortingParams): number {
        return SortingDialogComponent.getNumberOfActiveSortings(sortingSettings);
    }
}
