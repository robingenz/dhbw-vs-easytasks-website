export interface IReport {
    openTasks: number;
    dueTasksTwoDays: number;
    percentTasksExceeded: number;
    averageTaskProcessingTime: number;
    tasksPerPriority: {
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
    };
    taskCountPerTasklist: {
        tasklistId: number;
        tasklistTitle: string;
        openTasks: number;
        expiredTasks: number;
        closedTasks: number;
    }[];
    taskCountActualWeek: {
        closedTasks: number;
        exceededTasks: number;
    };
    bestDay: number;
}
