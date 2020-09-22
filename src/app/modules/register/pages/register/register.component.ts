import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoadingService } from '@app/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from '@app/shared';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registrationFormGroup: FormGroup;
    isLoading$: Observable<boolean>;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService,
    ) {
        this.registrationFormGroup = this.fb.group(
            {
                username: [
                    '',
                    {
                        validators: Validators.required,
                    },
                ],
                password: [
                    '',
                    {
                        validators: [Validators.required, Validators.minLength(6)],
                    },
                ],
                confirmPassword: [
                    '',
                    {
                        validators: [Validators.required, Validators.minLength(6)],
                    },
                ],
            },
            { validator: matchPasswordValidation },
        );
        this.isLoading$ = this.loadingService.isLoading$;
    }

    ngOnInit() {}

    public async register(registrationFormGroup: FormGroup): Promise<boolean> {
        if (!registrationFormGroup.valid) {
            this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                data: {
                    title: 'Error',
                    message: 'Registration failed! Please fill out all fields correctly.',
                },
            });
            return false;
        }
        this.loadingService.setIsLoading(true);
        try {
            await this.authService.register(registrationFormGroup.value.username, registrationFormGroup.value.password);
            this.snackBar.open('Registration successful.', undefined, { duration: 4000 });
            return await this.router.navigate(['/login'], { replaceUrl: true });
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

export function matchPasswordValidation(ac: AbstractControl) {
    const acPassword = ac.get('password');
    const acConfirmPassword = ac.get('confirmPassword');
    if (!acPassword || !acConfirmPassword) {
        return null;
    }
    const password = acPassword.value;
    const confirmPassword = acConfirmPassword.value;
    if (password !== confirmPassword) {
        acConfirmPassword.setErrors({ MatchPassword: true });
    } else {
        return null;
    }
}
