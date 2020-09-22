import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoadingService } from '@app/core';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from '@app/shared';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isLoading$: Observable<boolean>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private loadingService: LoadingService,
        private dialog: MatDialog,
    ) {
        this.loginFormGroup = new FormGroup({
            username: new FormControl('', {
                validators: Validators.required,
            }),
            password: new FormControl('', {
                validators: Validators.required,
            }),
        });
        this.isLoading$ = this.loadingService.isLoading$;
    }

    ngOnInit() {}

    public async login(loginFormGroup: FormGroup): Promise<boolean> {
        if (!loginFormGroup.valid) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'Login failed! Please fill out all fields correctly.',
                },
            });
            return false;
        }
        this.loadingService.setIsLoading(true);
        try {
            await this.authService.login(loginFormGroup.value.username, loginFormGroup.value.password);
            return await this.router.navigate(['dashboard'], { replaceUrl: true });
        } catch (error) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: error.error.message,
                },
            });
        } finally {
            this.loadingService.setIsLoading(false);
        }
        return false;
    }
}
