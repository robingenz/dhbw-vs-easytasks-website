import { IApiTaskParams } from './api-task-params';

export interface IApiTaskListParams {
    id: number;
    title: string;
    updatedAt: number;
    createdAt: number;
    tasks?: IApiTaskParams[];
}
