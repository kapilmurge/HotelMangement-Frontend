import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, BookingStatus } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html'
})
export class BookRoomComponent implements OnInit {

  roomId!: number;
  roomPrice!: number;
  availableRooms!: number;
  
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  bookingForm = this.fb.nonNullable.group({
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
    numberOfRooms: [1, [Validators.required, Validators.min(1)]],
    price: [0, Validators.required]
  });

  ngOnInit(): void {

  const idParam = this.route.snapshot.paramMap.get('id');
  if (!idParam) return;

  this.roomId = Number(idParam);

  // Fetch room price once
  this.roomService.getRoomById(this.roomId)
  .subscribe({
    next: (response) => {
      if (response.success && response.data) {
        this.roomPrice = response.data.price;
        this.availableRooms = response.data.available;

        console.log("Room Price:", this.roomPrice);
        console.log("Available:", this.availableRooms);
      }
    }
  });

  // Recalculate whenever form changes
  this.bookingForm.valueChanges.subscribe(() => {
    this.calculatePrice();
  });
}

  private calculatePrice(): void {

  const checkIn = this.bookingForm.get('checkInDate')?.value;
  const checkOut = this.bookingForm.get('checkOutDate')?.value;
  const numberOfRooms = this.bookingForm.get('numberOfRooms')?.value;

  // Wait until all values exist
  if (!checkIn || !checkOut || numberOfRooms == null) {
    return;
  }

  if (this.roomPrice == null || this.availableRooms == null) {
    return;
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  // Invalid date range
  if (outDate <= inDate) {
    this.bookingForm.get('checkOutDate')?.setErrors({ invalidRange: true });
    this.bookingForm.patchValue({ price: 0 }, { emitEvent: false });
    return;
  }

  // Prevent overbooking FIRST
  if (numberOfRooms > this.availableRooms) {
    this.bookingForm.get('numberOfRooms')?.setErrors({ notEnough: true });
    this.bookingForm.patchValue({ price: 0 }, { emitEvent: false });
    return;
  }

  // Calculate days
  const diffTime = outDate.getTime() - inDate.getTime();
  const days = Math.ceil(diffTime / (1000 * 3600 * 24));

  const totalPrice = this.roomPrice * days * numberOfRooms;

  this.bookingForm.patchValue(
    { price: totalPrice },
    { emitEvent: false }
  );

  console.log('Room Price:', this.roomPrice);
console.log('Days:', days);
console.log('Rooms:', numberOfRooms);
console.log('Total:', totalPrice);
}

bookRoom(): void {

  if (this.bookingForm.invalid) return;

  const user = this.authService.getCurrentUser();
  if (!user) {
    alert('Please login first');
    return;
  }

  const value = this.bookingForm.getRawValue();

  const booking: Booking = {
    id: 0,
    roomId: this.roomId,
    userId: user.id,
    checkInDate: new Date(value.checkInDate).toISOString(),
    checkOutDate: new Date(value.checkOutDate).toISOString(),
    price: value.price,
    numberOfRooms: value.numberOfRooms,
    status: 'PENDING'
  };

  this.bookingService.bookRoom(booking)
    .subscribe({
      next: () => {
        alert('Booking successful');
        this.router.navigate(['/customer/history']);
      },
      error: (err) => {
        alert(err.error?.message || 'Booking failed');
      }
    });
}

}