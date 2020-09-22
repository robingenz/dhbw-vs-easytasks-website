import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages';
import { ReportCardComponent } from './components';
import { WeekdayPipe } from './pipe/weekday/weekday.pipe';

@NgModule({
    declarations: [DashboardComponent, ReportCardComponent, WeekdayPipe],
    imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
