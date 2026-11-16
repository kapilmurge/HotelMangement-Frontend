import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

  hotels: Hotel[] = [];

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
  this.hotelService.getAllHotels()
    .subscribe({
      next: (response) => {
        console.log('Response:', response);

        if (response.success) {
          this.hotels = response.data;
        }
      },
      error: (err: Error) => {
        console.error(err);
        alert(err.message);
      }
    });
}

  editHotel(id: number): void {
    this.router.navigate(['/admin/edit-hotel', id]);
  }

  deleteHotel(id: number): void {
    this.hotelService.deleteHotel(id)
      .subscribe(() => {
        this.loadHotels();
      });
  }
}