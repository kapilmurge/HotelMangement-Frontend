import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Branch } from '../../models/branch.model';
import { Hotel } from '../../models/hotel.model';
import { BranchService } from '../../services/branch.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html'
})
export class AddBranchComponent implements OnInit {

  hotels: Hotel[] = [];

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private hotelService: HotelService
  ) {}

  branchForm = this.fb.nonNullable.group({
    branchName: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    rating: [0, Validators.required],
    phone: ['', Validators.required],
    imgUrl: ['', Validators.required],
    hotelId: [0, Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.hotelService.getAllHotels()
  .subscribe({
    next: (response) => {
      if (response.success) {
        this.hotels = response.data;
      }
    },
    error: (err: Error) => {
      alert(err.message);
    }
  });
  }

  addBranch(): void {

    if (this.branchForm.invalid) return;

    const value = this.branchForm.getRawValue();

    const branch: Branch = {
      id: 0,
  branchName: value.branchName,
  city: value.city,
  address: value.address,
  rating: value.rating,
  phone: value.phone,
  imgUrl: value.imgUrl,
  hotelId: value.hotelId,
  email: value.email
    };

    this.branchService.addBranch(branch)
      .subscribe(() => {
        alert('Branch Added Successfully');
        this.branchForm.reset();
      });
  }
}