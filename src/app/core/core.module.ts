import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthService } from './authentication';
import { AuthGuard, NoAuthGuard } from './guards';
import {
    ApiService,
    StorageService,
    TokenService,
    ToolsService,
    LoadingService,
    TaskListService,
    DataUpdateNotificationService,
    TaskService,
} from './services';

@NgModule({
    imports: [],
    providers: [
        AuthService,
        AuthGuard,
        NoAuthGuard,
        ApiService,
        StorageService,
        TokenService,
        ToolsService,
        LoadingService,
        TaskService,
        TaskListService,
        DataUpdateNotificationService,
    ],
    exports: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
