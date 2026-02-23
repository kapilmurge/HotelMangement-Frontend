import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  goToAddRoom(): void {
    this.router.navigate(['/admin/add-room']);
  }

  goToRoomList(): void {
    this.router.navigate(['/admin/rooms']);
  }
}