import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    map1 = new Map<string, string>();
    isResponseSent: boolean = true;
    passwordFieldType: string = 'password';

    loginObj: any = {
        userName: '',
        password: ''
    };

    constructor(private sharedService: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.loginObj.userName = 'shylam';
        this.loginObj.password = 'password123'
    }

    private displayErrorMessage(key: string, value: string): void {
        this.map1.set(key, value);
        this.isResponseSent = false;
    }

    togglePasswordVisibility(): void {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

    onSubmit(): void {
        this.map1.clear();
        this.isResponseSent = true;

        if (!this.loginObj.userName) {
            this.displayErrorMessage('UserNameErrorMessage', 'Please enter a valid username.');
            return;
        }

        if (!this.loginObj.password) {
            this.displayErrorMessage('PasswordErrorMessage', 'Please enter a valid password.');
            return;
        }

        this.sharedService.login(this.loginObj).subscribe({
            next: (response: any) => {
                this.sharedService.setLoggedInUser(response);
                this.router.navigate(['/homepage/makeReq']);
            },
            error: (err) => {
                console.error('Login failed', err);
                if (err.message) {
                    this.displayErrorMessage('ErrorMessage', 'Invalid credentials. Please try again.');
                }
            }
        });
    }
}
