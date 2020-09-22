import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskStatus, Task } from '@app/core';

@Component({
    selector: 'app-task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {
    @Input() task: Task | undefined;
    @Output() taskClick: EventEmitter<Task> = new EventEmitter();
    @Output() taskCheck: EventEmitter<Task> = new EventEmitter();
    dateNow = new Date();
    taskStatus = TaskStatus;

    constructor() {}

    ngOnInit() {}

    public onTaskClick(task: Task): void {
        if (task.status === TaskStatus.done) {
            return;
        }
        this.taskClick.emit(task);
    }

    public onTaskCheck(task: Task): void {
        if (task.status === TaskStatus.done) {
            return;
        }
        this.taskCheck.emit(task);
    }
}
