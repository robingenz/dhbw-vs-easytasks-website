import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, SharedModule, LoginRoutingModule],
})
export class LoginModule {}
