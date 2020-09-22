import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    IReport,
    ApiService,
    Task,
    TaskService,
    DataUpdateNotificationService,
    TaskStatus,
    ITasksFilterParams,
    ITasksSortingParams,
    TaskList,
    TaskListService,
} from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ErrorDialogComponent, FilterDialogComponent, SortingDialogComponent } from '@app/shared';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    reportData: IReport | undefined;
    taskLists: TaskList[] = [];
    tasks: Task[] = [];
    tasksFilterSettings: ITasksFilterParams = {};
    tasksSortingSettings: ITasksSortingParams = {};
    destroy$: Subject<void> = new Subject();

    constructor(
        private apiService: ApiService,
        private taskService: TaskService,
        private dataUpdateNotificationService: DataUpdateNotificationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private taskListService: TaskListService,
    ) {}

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async init(): Promise<void> {
        this.reportData = await this.apiService.report();
        this.taskLists = await this.taskListService.getTaskLists();
        this.tasks = await this.taskService.getTasks();
        merge(this.dataUpdateNotificationService.taskUpdate$, this.dataUpdateNotificationService.taskListUpdate$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.apiService.report().then(reportData => {
                    this.reportData = reportData;
                });
                this.taskService.getTasks(this.tasksFilterSettings, this.tasksSortingSettings).then(tasks => {
                    this.tasks = tasks;
                });
            });
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
                isSingleListView: false,
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
        return FilterDialogComponent.getNumberOfActiveFilters(filterSettings, false);
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
