import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './pages';

@NgModule({
    declarations: [ListComponent],
    imports: [CommonModule, ListRoutingModule, SharedModule],
})
export class ListModule {}
