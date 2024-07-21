import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InproInterface } from './homepage/inProgress/inpro-interface';
import { Ticket, StatusDescription, Category, Admins, Country } from './interface';


@Injectable({
    providedIn: 'root'
})


export class SharedService {
    private loggedInUser: any;
    private inProgressUser: any;

    constructor(private _http: HttpClient) { }

    login(loginPayload: any): Observable<any> {
        return this._http.post<any>(`/log`, loginPayload);
    }

    signup(signupPayload: any): Observable<any> {
        return this._http.post<any>(`/sign`, signupPayload);
    }

    makeServiceRequest(makeServiceRequest: any): Observable<any> {
        return this._http.post<any>(`/makeServiceRequest`, makeServiceRequest);
    }

    deleteInProgress(deleteTicketId: number): Observable<any> {
        return this._http.delete<any>(`/deleteTicket/${deleteTicketId}`);
    }

    getCountries(): Observable<Country[]> {
        return this._http.get<Country[]>(`/count`);
    }

    getCategories(): Observable<Category[]> {
        return this._http.get<Category[]>('/service');
    }


    getAdmin(): Observable<Admins[]> {
        return this._http.get<Admins[]>('/getAllAdmins');
    }

    setLoggedInUser(user: any): void {
        this.loggedInUser = user;
    }

    getLoggedInUser(): any {
        return this.loggedInUser;
    }

    setInProgress(user: any): void {
        this.inProgressUser = user;
    }

    getInProgress(): any {
        return this.inProgressUser;
    }

    getAllInProgressTicket(): Observable<InproInterface> {
        return this._http.get<InproInterface>(`/getAllIn-progressTickets/${this.loggedInUser.personId}/1/0/5`);
    }

    assignTicket(assignPayLoad: any): Observable<any> {
        return this._http.post<any>(`assignTicket`,assignPayLoad)
    }



}
