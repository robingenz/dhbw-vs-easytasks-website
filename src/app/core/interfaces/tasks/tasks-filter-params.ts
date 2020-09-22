import { TaskStatus, TaskUrgency } from '@app/core/enums';
import { TaskPriority } from '@app/core/types';

export interface ITasksFilterParams {
    tasklist_id?: number[];
    priority?: TaskPriority[];
    status?: TaskStatus[];
    deadlineFrom?: Date;
    deadlineTo?: Date;
    createdFrom?: Date;
    createdTo?: Date;
    updatedFrom?: Date;
    updatedTo?: Date;
    limit?: number;
    urgency?: TaskUrgency[];
}
