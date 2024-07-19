import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  isDropdownVisible: boolean = false;

  constructor(private _router: Router) {}

  public toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  public userProfile(event: Event): void {
    event.preventDefault();
    this._router.navigate(['/homepage/userPro']);
  }
  
  public logout(event: Event): void {
    event.preventDefault();
    this._router.navigate(['/login']);
  }
}
