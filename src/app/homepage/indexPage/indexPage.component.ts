import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexPage',
  templateUrl: './indexPage.component.html',
  styleUrls: ['./indexPage.component.css']
})
export class IndexPageComponent implements OnInit {
  about : string = "SupportSuite is a request handling website developed by Abin Raj B and Shyla M under the guidance of Arun Raj, John Winsley, and Sasi Kumar at Polus Solutions Private Limited.";
  allRequestCount: any ={}


  constructor(private _sharedService : SharedService, private router: Router) { }

  ngOnInit() {
    this.getAllRequestCount();
  }

  goToMakeServiceRequest() {
    this.router.navigate(['homepage/makeReq']);
  }
  private getAllRequestCount(): void{
   this._sharedService.getAllRequestCount().subscribe({
    next: (response: any) => {
        this.allRequestCount=response;
    },
    error: (err) => {

    }
});
  }
}
