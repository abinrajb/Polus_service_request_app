import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) { }

    login(loginPayload: any): Observable<any> {
        return this.http.post<any>(`/log`, loginPayload);
    }

    signup(signupPayload: any): Observable<any> {
        return this.http.post<any>(`/sign`, signupPayload);
    }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`/count`);
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

