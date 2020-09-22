import { IApiTaskListParams } from '../interfaces';
import { Task } from './task';
import { DateTimeConverter } from '../helpers';

export class TaskList {
    public id: number = 0;
    public title: string = '';
    public updatedAt: Date = new Date(0);
    public createdAt: Date = new Date(0);
    public tasks: Task[] = [];

    constructor(taskListElement: IApiTaskListParams) {
        this.id = taskListElement.id;
        this.title = taskListElement.title;
        this.updatedAt = DateTimeConverter.convertTimestampToDate(taskListElement.updatedAt);
        this.createdAt = DateTimeConverter.convertTimestampToDate(taskListElement.createdAt);
        for (const taskElement of taskListElement.tasks || []) {
            this.tasks.push(new Task(taskElement));
        }
    }

    public toApiTaskListParams(): IApiTaskListParams {
        const apiTaskListParams: IApiTaskListParams = {
            id: this.id,
            title: this.title,
            updatedAt: DateTimeConverter.convertDateToTimestamp(this.updatedAt),
            createdAt: DateTimeConverter.convertDateToTimestamp(this.createdAt),
        };
        for (const task of this.tasks) {
            apiTaskListParams.tasks ? apiTaskListParams.tasks.push(task.toApiTaskParams()) : [];
        }
        return apiTaskListParams;
    }
}
