import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule, AuthorizationInterceptor, LoadingInterceptor } from '@app/core';
import { SharedModule } from '@app/shared';
import { LayoutModule } from '@app/layouts';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { GestureConfig, MAT_DATE_LOCALE } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');

@NgModule({
    declarations: [AppComponent],
    imports: [CoreModule, SharedModule, LayoutModule, BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
        { provide: MAT_DATE_LOCALE, useValue: 'de' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
