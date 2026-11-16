import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html'
})
export class BookingHistoryComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();

    if (!user) {
      alert('Please login first');
      return;
    }

    this.bookingService.getBookingsByUser(user.id)
      .subscribe({
        next: (response) => {
          this.bookings = response.data;
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to load bookings');
        }
      });
  }
}