import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Category } from '../../interface';

@Component({
  selector: 'app-makeServiceRequest',
  templateUrl: './makeServiceRequest.component.html',
  styleUrls: ['./makeServiceRequest.component.css']
})
export class MakeServiceRequestComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) {}

  loggedInUser: any;
  categories: Category[] = [];
  selectService: any ={}
  isResponseSent: boolean=true;
  errorMap = new Map<string, string>();

  makeReqObj: any = {
    category: '',
    requestDescription: '',
    personId: null
  };

  ngOnInit() {
    this.getCategories();
    this.loggedInUser = this._sharedService.getLoggedInUser();
  }

  private displayErrorMessage(key: string, value: string): void {
    this.errorMap.set(key, value);
    this.isResponseSent = false;
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

  private requestInitialize(): void{
    this.makeReqObj.personId = this.loggedInUser.personId;
    this.makeReqObj.category = this.selectService.categoryCode;
  }

  
  public addInProgress(): void{
    this.requestInitialize(); 
    this.errorMap.clear(); 

    if (!this.makeReqObj.requestDescription) {
      this.displayErrorMessage('descriptionErrorMessage', 'Please select a service to continue.');
    } 

    if(this.isResponseSent){
      this._sharedService.makeServiceRequest(this.makeReqObj).subscribe({
            next: (response: any) => {
            
            },
            error: (err) => {

            }
        });
    }

  }

  public clearForm(): void {
    this.makeReqObj = {
      category: '',
      requestDescription: '',
      admin: ''
    };
    this.errorMap.clear(); 
  }
}
