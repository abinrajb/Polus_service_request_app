import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private router = inject(Router);
    private sharedService = inject(SharedService);
    isResponseSent: boolean = true;
    errorMessage: string = '';
    countries: Country[] = [];
    selectedCountry: string = '';
    map1 = new Map<string, string>();
    passwordFieldType: string = 'password';

    signupObj: any = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phoneNo: '',
        address: '',
        password: ''
    };

    signupConfirmPassword: string = '';

    ngOnInit(): void {
        this.getCountries();
    }

    private isValidName(name: string): boolean {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailRegex.test(email);
    }

    private isValidPhoneNumber(phoneNumber: number): boolean {
        return phoneNumber.toString().length === 10;
    }

    private displayErrorMessage(key: string, value: string): void {
        this.map1.set(key, value);
        this.isResponseSent = false;
    }

    private getCountries(): void {
        this.sharedService.getCountries().subscribe({
            next: (data: Country[]) => {
                this.countries = data.sort((a, b) => a.countryName.localeCompare(b.countryName));
            },
            error: (err) => {
                console.error('Failed to fetch countries', err);
            }
        });
    }

    togglePasswordVisibility(): void {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

    public signupValue(): void {
        this.map1.clear();
        this.errorMessage = '';
        this.isResponseSent = true;

        if (!this.signupObj.userName) {
            this.displayErrorMessage('UserNameErrorMessage', 'Please enter a valid username.');
        }
        if (!this.signupObj.password) {
            this.displayErrorMessage('newPasswordErrorMessage', 'Please enter a valid password.');
        }
        if (!this.isValidName(this.signupObj.firstName)) {
            this.displayErrorMessage('firstNameErrorMessage', 'Firstname should only contain alphabets.');
        }
        if (!this.isValidName(this.signupObj.lastName)) {
            this.displayErrorMessage('LastNameErrorMessage', 'Lastname should only contain alphabets.');
        }
        if (!this.signupObj.address) {
            this.displayErrorMessage('addressErrorMessage', 'Please enter a valid address.');
        }
        if (!this.isValidEmail(this.signupObj.email)) {
            this.displayErrorMessage('emailErrorMessage', 'Please enter a valid email.');
        }
        if (!this.isValidPhoneNumber(this.signupObj.phoneNo)) {
            this.displayErrorMessage('phoneNoerrorMessage', 'Enter a valid phone number.');
        }
        if (!this.signupObj.country) {
            this.displayErrorMessage('countryErrorMessage', 'Select a country.');
        }
        if (this.signupObj.password !== this.signupConfirmPassword) {
            this.displayErrorMessage('ConfirmPasswordErrorMessage', "New password and confirm password don't match.");
        }

        if (this.isResponseSent) {
            this.sharedService.signup(this.signupObj).subscribe({
                next: (response: any) => {
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error('Signup failed', err);
                    this.router.navigate(['/signup']);
                }
            });
        }
    }
}

interface Country {
    countryCode: string;
    countryName: string;
    currencyCode: string;
    updateTimestamp: Date;
    updateUser: string;
    countryCodeIso2: string;
}



