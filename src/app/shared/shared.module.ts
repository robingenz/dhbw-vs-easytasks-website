import { NgModule } from '@angular/core';
import {
    ErrorDialogComponent,
    AddTaskListDialogComponent,
    SidenavComponent,
    DeleteTaskListDialogComponent,
    SortingDialogComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskEditFormComponent,
    FilterDialogComponent,
} from './components';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [MaterialModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    entryComponents: [
        ErrorDialogComponent,
        AddTaskListDialogComponent,
        DeleteTaskListDialogComponent,
        FilterDialogComponent,
        SortingDialogComponent,
    ],
    declarations: [
        ErrorDialogComponent,
        AddTaskListDialogComponent,
        DeleteTaskListDialogComponent,
        SidenavComponent,
        FilterDialogComponent,
        SortingDialogComponent,
        TaskListComponent,
        TaskListItemComponent,
        TaskEditFormComponent,
    ],
    exports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        SidenavComponent,
        TaskListComponent,
        TaskListItemComponent,
    ],
})
export class SharedModule {}
