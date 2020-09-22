import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './pages';

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, SharedModule, RegisterRoutingModule],
})
export class RegisterModule {}
