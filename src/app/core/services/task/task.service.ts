import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ITasksFilterParams, ITasksSortingParams } from '@app/core/interfaces/tasks';
import { IApiGetTasksInputParams, IApiTaskParams } from '@app/core/interfaces';
import { TaskStatus } from '@app/core/enums';
import { Task } from '@app/core/classes';
import { DateTimeConverter } from '@app/core/helpers';

@Injectable()
export class TaskService {
    constructor(private apiService: ApiService) {}

    public async getTaskById(taskId: number): Promise<Task> {
        const apiTaskParams = await this.apiService.getTask(taskId);
        return new Task(apiTaskParams);
    }

    public async deleteTaskById(taskId: number): Promise<void> {
        return await this.apiService.deleteTask(taskId);
    }

    public async updateTask(task: Task): Promise<Task> {
        const apiTaskParams = await this.apiService.updateTask(task.toApiTaskParams());
        return new Task(apiTaskParams);
    }

    public async createTask(title: string, taskListId: number): Promise<void> {
        const task: IApiTaskParams = {
            id: 0,
            title: title,
            description: '',
            priority: 1,
            deadline: null,
            status: TaskStatus.open,
            updatedAt: 0,
            createdAt: 0,
            tasklistId: taskListId,
        };
        await this.apiService.storeTask(task);
    }

    public async getTasks(filter?: ITasksFilterParams, sorting?: ITasksSortingParams): Promise<Task[]> {
        filter = filter ? filter : {};
        sorting = sorting ? sorting : {};
        const inputParams: IApiGetTasksInputParams = this.createApiGetTasksInputParams(filter, sorting);
        const apiTasksParams = await this.apiService.getTasks(inputParams);
        const tasks: Task[] = [];
        for (const taskParams of apiTasksParams) {
            tasks.push(new Task(taskParams));
        }
        return tasks;
    }

    private createApiGetTasksInputParams(filter: ITasksFilterParams, sorting: ITasksSortingParams): IApiGetTasksInputParams {
        const apiGetTasksInputParams: IApiGetTasksInputParams = {
            tasklist_id: filter.tasklist_id,
            urgency: filter.urgency,
            status: filter.status,
            limit: filter.limit,
            orderBy: sorting.orderBy,
            sortBy: sorting.sortBy,
        };
        if (filter.deadlineFrom) {
            apiGetTasksInputParams.deadlineFrom = DateTimeConverter.convertDateToTimestamp(filter.deadlineFrom);
        }
        if (filter.deadlineTo) {
            apiGetTasksInputParams.deadlineTo = DateTimeConverter.convertDateToTimestamp(filter.deadlineTo);
        }
        if (filter.createdFrom) {
            apiGetTasksInputParams.createdFrom = DateTimeConverter.convertDateToTimestamp(filter.createdFrom);
        }
        if (filter.createdTo) {
            apiGetTasksInputParams.createdTo = DateTimeConverter.convertDateToTimestamp(filter.createdTo);
        }
        if (filter.updatedFrom) {
            apiGetTasksInputParams.updatedFrom = DateTimeConverter.convertDateToTimestamp(filter.updatedFrom);
        }
        if (filter.updatedTo) {
            apiGetTasksInputParams.updatedTo = DateTimeConverter.convertDateToTimestamp(filter.updatedTo);
        }
        return apiGetTasksInputParams;
    }
}
