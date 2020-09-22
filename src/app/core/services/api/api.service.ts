import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    IApiAuthTokenInputParams,
    IApiAuthTokenOutputParams,
    IApiAuthRevokeInputParams,
    IApiAuthRegisterInputParams,
    IApiDefaultOutputParams,
    IApiGetTasksInputParams,
    IApiTaskParams,
    IApiTaskListParams,
    IReport,
} from '@app/core/interfaces';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    public async token(apiAuthTokenInputParams: IApiAuthTokenInputParams): Promise<IApiAuthTokenOutputParams> {
        return await this.http.post<IApiAuthTokenOutputParams>(Config.apiBaseUrl + '/auth/token', apiAuthTokenInputParams).toPromise();
    }

    public async revoke(apiAuthRevokeInputParams: IApiAuthRevokeInputParams): Promise<IApiDefaultOutputParams> {
        return await this.http.post<IApiDefaultOutputParams>(Config.apiBaseUrl + '/auth/revoke', apiAuthRevokeInputParams).toPromise();
    }

    public async register(apiAuthTokenInputParams: IApiAuthRegisterInputParams): Promise<IApiDefaultOutputParams> {
        return await this.http.post<IApiDefaultOutputParams>(Config.apiBaseUrl + '/auth/register', apiAuthTokenInputParams).toPromise();
    }

    public async getTasks(apiGetTasksInputParams: IApiGetTasksInputParams): Promise<IApiTaskParams[]> {
        const urlSearchParams = new URLSearchParams();
        for (const key of Object.keys(apiGetTasksInputParams)) {
            if (apiGetTasksInputParams[key] == null) {
                continue;
            }
            if (Array.isArray(apiGetTasksInputParams[key])) {
                for (const value of apiGetTasksInputParams[key]) {
                    urlSearchParams.append(key + '[]', value);
                }
            } else {
                urlSearchParams.append(key, apiGetTasksInputParams[key]);
            }
        }
        let params = '';
        if (urlSearchParams.getAll.length > 0) {
            params = '?' + urlSearchParams.toString();
        }
        return await this.http.get<IApiTaskParams[]>(Config.apiBaseUrl + '/tasks' + params).toPromise();
    }

    public async getTask(id: number): Promise<IApiTaskParams> {
        return await this.http.get<IApiTaskParams>(Config.apiBaseUrl + '/tasks/' + id).toPromise();
    }

    public async storeTask(task: IApiTaskParams): Promise<void> {
        await this.http.post(Config.apiBaseUrl + '/tasks', task).toPromise();
    }

    public async updateTask(task: IApiTaskParams): Promise<IApiTaskParams> {
        return await this.http.put<IApiTaskParams>(Config.apiBaseUrl + '/tasks/' + task.id, task).toPromise();
    }

    public async deleteTask(id: number): Promise<void> {
        await this.http.delete(Config.apiBaseUrl + '/tasks/' + id).toPromise();
    }

    public async getTaskLists(withTasks = false): Promise<IApiTaskListParams[]> {
        const params = new HttpParams().append('withTasks', withTasks.toString());
        return await this.http.get<IApiTaskListParams[]>(Config.apiBaseUrl + '/tasklists', { params: params }).toPromise();
    }

    public async getTaskList(id: number, withTasks = false): Promise<IApiTaskListParams> {
        const params = new HttpParams().set('withTasks', withTasks.toString());
        return await this.http.get<IApiTaskListParams>(Config.apiBaseUrl + '/tasklists/' + id, { params: params }).toPromise();
    }

    public async storeTaskList(taskList: IApiTaskListParams): Promise<void> {
        await this.http.post(Config.apiBaseUrl + '/tasklists', taskList).toPromise();
    }

    public async updateTaskList(taskList: IApiTaskListParams): Promise<IApiTaskListParams> {
        return await this.http.put<IApiTaskListParams>(Config.apiBaseUrl + '/tasklists/' + taskList.id, taskList).toPromise();
    }

    public async deleteTaskList(id: number): Promise<void> {
        await this.http.delete(Config.apiBaseUrl + '/tasklists/' + id).toPromise();
    }

    public async report(): Promise<IReport> {
        return await this.http.get<IReport>(Config.apiBaseUrl + '/report').toPromise();
    }
}
