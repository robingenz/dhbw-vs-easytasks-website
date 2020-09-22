import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TaskList } from '@app/core/classes';
import { IApiTaskListParams } from '@app/core/interfaces';

@Injectable()
export class TaskListService {
    constructor(private apiService: ApiService) {}

    public async getTaskList(taskListId: number, withTasks?: boolean): Promise<TaskList> {
        const apiTaskListParams = await this.apiService.getTaskList(taskListId, withTasks);
        return new TaskList(apiTaskListParams);
    }

    public async getTaskLists(withTasks?: boolean): Promise<TaskList[]> {
        const apiTaskListParams = await this.apiService.getTaskLists(withTasks);
        const taskLists: TaskList[] = [];
        for (const taskListParams of apiTaskListParams) {
            taskLists.push(new TaskList(taskListParams));
        }
        return taskLists;
    }

    public async createTaskList(title: string): Promise<void> {
        const taskList: IApiTaskListParams = {
            id: 0,
            title: title,
            updatedAt: 0,
            createdAt: 0,
        };
        await this.apiService.storeTaskList(taskList);
    }

    public async deleteTaskListById(taskListId: number): Promise<void> {
        return await this.apiService.deleteTaskList(taskListId);
    }

    public async updateTaskList(taskList: TaskList): Promise<TaskList> {
        const apiTaskListParams = await this.apiService.updateTaskList(taskList.toApiTaskListParams());
        return new TaskList(apiTaskListParams);
    }
}
