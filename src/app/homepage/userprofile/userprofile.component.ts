import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

    loggedInUser: any;
    isEditMode: boolean = false;

    constructor(private _sharedService: SharedService, 
                private _router: Router) {}

    ngOnInit(): void {
        this.loggedInUser = this._sharedService.getLoggedInUser();
    }

}




