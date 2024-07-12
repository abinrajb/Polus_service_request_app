import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isSidebarVisible: boolean = false;
  isDropdownVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
