import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@app/core/guards';
import { DefaultLayoutComponent, DashboardLayoutComponent } from '@app/layouts';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            { path: 'login', loadChildren: '@app/modules/login/login.module#LoginModule', canActivate: [NoAuthGuard] },
            { path: 'register', loadChildren: '@app/modules/register/register.module#RegisterModule', canActivate: [NoAuthGuard] },
        ],
    },
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: '@app/modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
            { path: 'list/:id', loadChildren: '@app/modules/list/list.module#ListModule', canActivate: [AuthGuard] },
        ],
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
