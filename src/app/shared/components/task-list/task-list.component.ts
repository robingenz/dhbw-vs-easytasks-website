import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '@app/core';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    @Input() tasks: Task[] = [];
    @Input() title: string = '';
    @Output() taskClick: EventEmitter<Task> = new EventEmitter();
    @Output() taskCheck: EventEmitter<Task> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    public onTaskClick(task: Task): void {
        this.taskClick.emit(task);
    }

    public onTaskCheck(task: Task): void {
        this.taskCheck.emit(task);
    }
}
