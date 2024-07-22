import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Category } from './inpro-interface';
import { Admins } from '../../interface';

@Component({
    selector: 'app-inProgress',
    templateUrl: './inProgress.component.html',
    styleUrls: ['./inProgress.component.css']
})
export class InProgressComponent implements OnInit {

    inProgressTickets: any = [];
    loggedInUser: any;
    errorMap = new Map<string, string>();
    isResponseSent: boolean = true;
    categories: Category[] = [];
    administrator: Admins[] = [];
    editReqObjPayload: any = {
        category: '',
        requestDescription: '',
        personId: null,
        ticketId:null
    };
    assignTicketObj: any={
       ticketId:null,
       assignedTo:null
    }

    constructor(private _sharedService: SharedService,
                private _router: Router) { }

    ngOnInit() {
        this.getCategories();
        this.loggedInUser = this._sharedService.getLoggedInUser();
        this.loadInProgressTickets();
        this.getAdmin();
    }


    
    private displayErrorMessage(key: string, value: string): void {
        this.errorMap.set(key, value);
        this.isResponseSent = false;
    }


    public getTime(timestamp: string): string {
        const NOW = new Date();
        const PASTDATE = new Date(timestamp);
        const SECONDSAGO = Math.floor((NOW.getTime() - PASTDATE.getTime()) / 1000);
        const MINUTESAGO = Math.floor(SECONDSAGO / 60);
        const HOURSAGO = Math.floor(MINUTESAGO / 60);
        const DAYSAGO = Math.floor(HOURSAGO / 24);
        const WEEKSAGO = Math.floor(DAYSAGO / 7);
        const MONTHSAGO = Math.floor(DAYSAGO / 30);
        const YEARSAGO = Math.floor(DAYSAGO / 365);
        if (YEARSAGO > 0) {
            return YEARSAGO === 1 ? '1 year ago' : `${YEARSAGO} years ago`;
        } else if (MONTHSAGO > 0) {
            return MONTHSAGO === 1 ? '1 month ago' : `${MONTHSAGO} months ago`;
        } else if (WEEKSAGO > 0) {
            return WEEKSAGO === 1 ? '1 week ago' : `${WEEKSAGO} weeks ago`;
        } else if (DAYSAGO > 0) {
            return DAYSAGO === 1 ? '1 day ago' : `${DAYSAGO} days ago`;
        } else if (HOURSAGO > 0) {
            return HOURSAGO === 1 ? '1 hour ago' : `${HOURSAGO} hours ago`;
        } else if (MINUTESAGO > 0) {
            return MINUTESAGO === 1 ? '1 minute ago' : `${MINUTESAGO} minutes ago`;
        } else {
            return SECONDSAGO === 1 ? '1 second ago' : `${SECONDSAGO} seconds ago`;
        }
    }

    public loadInProgressTickets() {
        this._sharedService.getAllInProgressTicket().subscribe({
            next: (response: any) => {
                this.inProgressTickets = response;
            },
            error: (err) => {
                console.error('Failed to fetch in-progress tickets', err);
            }
        });
    }


    private getCategories(): void {
        this._sharedService.getCategories().subscribe({
            next: (data: Category[]) => {
                this.categories = data;
            },
            error: (err) => {
                console.error('Failed to fetch categories', err);
            }
        });
    }

    private getAdmin(): void {
    this._sharedService.getAdmin().subscribe({
            next: (data: Admins[]) => {
                this.administrator = data;
            },
            error: (err) => {
                console.error('Failed to fetch admins', err);
            }
        });
    }


    public currentTicket(ticket: any): void {
        this.assignTicketObj.ticketId=ticket.ticketId;
        this.editReqObjPayload = {
            requestDescription: ticket.requestDescription,
            ticketId: ticket.ticketId,
            personId: this.loggedInUser.personId,
        };
    }

    public saveChanges(): void {
        if (!this.editReqObjPayload.requestDescription) {
            this.displayErrorMessage('descriptionErrorMessage', 'Please provide a description to continue.');
            return;
        }
    
        this._sharedService.makeServiceRequest(this.editReqObjPayload).subscribe({
            next: (response: any) => {
                this.loadInProgressTickets();
            },
            error: (err) => {
                console.error('Failed to update ticket', err);
            }
        });
    }
    
    public deleteTicket(ticketId: number): void {
        this._sharedService.deleteInProgress(ticketId).subscribe({
            next: (response: any) => {
                this.loadInProgressTickets(); 
            },
            error: (err) => {
                console.error('Failed to delete ticket', err);
            }
        });
    }

    public assignTicket(): void{
        this._sharedService.assignTicket(this.assignTicketObj).subscribe({ 
            next: (response: any) => {
                console.log(response);
            }
        });
    }

}
