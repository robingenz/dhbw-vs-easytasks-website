import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

import { SharedModule } from '@app/shared';

@NgModule({
    declarations: [DefaultLayoutComponent, DashboardLayoutComponent],
    imports: [CommonModule, RouterModule, SharedModule],
})
export class LayoutModule {}
