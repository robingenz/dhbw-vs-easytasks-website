import { IApiTaskParams } from '../interfaces';
import { TaskStatus } from '../enums';
import { TaskPriority } from '../types';
import { DateTimeConverter } from '../helpers';

export class Task {
    public id: number = 0;
    public title: string = '';
    public description: string = '';
    public priority: TaskPriority = 1;
    public deadline: Date | null = null;
    public status: TaskStatus = TaskStatus.open;
    public updatedAt: Date = new Date(0);
    public createdAt: Date = new Date(0);
    public taskListId: number = 0;

    constructor(taskElement: IApiTaskParams) {
        this.id = taskElement.id;
        this.title = taskElement.title;
        this.description = taskElement.description;
        this.priority = taskElement.priority;
        this.deadline = taskElement.deadline ? DateTimeConverter.convertTimestampToDate(taskElement.deadline) : null;
        this.status = taskElement.status;
        this.updatedAt = DateTimeConverter.convertTimestampToDate(taskElement.updatedAt);
        this.createdAt = DateTimeConverter.convertTimestampToDate(taskElement.createdAt);
        this.taskListId = taskElement.tasklistId;
    }

    public toApiTaskParams(): IApiTaskParams {
        const apiTaskParams: IApiTaskParams = {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            deadline: this.deadline ? DateTimeConverter.convertDateToTimestamp(this.deadline) : null,
            status: this.status,
            updatedAt: DateTimeConverter.convertDateToTimestamp(this.updatedAt),
            createdAt: DateTimeConverter.convertDateToTimestamp(this.createdAt),
            tasklistId: this.taskListId,
        };
        return apiTaskParams;
    }
}
