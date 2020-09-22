import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './pages';
import { TaskEditFormComponent } from '@app/shared';

const routes: Routes = [
    { path: '', component: ListComponent },
    {
        path: 'task/:id',
        component: TaskEditFormComponent,
        outlet: 'sidebar',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListRoutingModule {}
