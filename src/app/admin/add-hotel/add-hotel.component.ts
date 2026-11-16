import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html'
})
export class AddHotelComponent {

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService
  ) {}

  hotelForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  addHotel(): void {

    if (this.hotelForm.invalid) return;

    const value = this.hotelForm.getRawValue();

    const hotel: Hotel = {
      id: 0,
      name: value.name,
      description: value.description,
      email: value.email,
      createdAt: new Date().toISOString()
    };

    this.hotelService.addHotel(hotel)
      .subscribe(() => {
        alert('Hotel Added Successfully');
        this.hotelForm.reset();
      });
  }
}