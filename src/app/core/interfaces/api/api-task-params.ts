import { TaskStatus } from '@app/core/enums';
import { TaskPriority } from '@app/core/types';

export interface IApiTaskParams {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    deadline: number | null;
    status: TaskStatus;
    updatedAt: number;
    createdAt: number;
    tasklistId: number;
}
