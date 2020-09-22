import { SortDirection, TaskProperty } from '@app/core/types';

export interface ITasksSortingParams {
    orderBy?: SortDirection[];
    sortBy?: (TaskProperty | 'urgency')[];
}
