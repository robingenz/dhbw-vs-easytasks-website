import { TaskPriority, SortDirection, TaskProperty } from '@app/core/types';
import { TaskStatus, TaskUrgency } from '@app/core/enums';

export type IApiGetTasksInputParams = {
    tasklist_id?: number[];
    priority?: TaskPriority[];
    status?: TaskStatus[];
    deadlineFrom?: number;
    deadlineTo?: number;
    createdFrom?: number;
    createdTo?: number;
    updatedFrom?: number;
    updatedTo?: number;
    limit?: number;
    urgency?: TaskUrgency[];
    orderBy?: SortDirection[];
    sortBy?: (TaskProperty | 'urgency')[];
};
