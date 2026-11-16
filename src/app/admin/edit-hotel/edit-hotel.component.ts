import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html'
})
export class EditHotelComponent implements OnInit {

  hotelId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  hotelForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.hotelId = Number(idParam);

    this.hotelService.getHotelById(this.hotelId)
      .subscribe((hotel: Hotel) => {
        this.hotelForm.patchValue({
          name: hotel.name,
          description: hotel.description,
          email: hotel.email
        });
      });
  }

  updateHotel(): void {

    if (this.hotelForm.invalid) return;

    const value = this.hotelForm.getRawValue();

    const updatedHotel: Hotel = {
      id: this.hotelId,
      name: value.name,
      description: value.description,
      email: value.email,
      createdAt: new Date().toISOString()
    };

    this.hotelService.updateHotel(updatedHotel)
      .subscribe(() => {
        this.router.navigate(['/admin/hotels']);
      });
  }
}