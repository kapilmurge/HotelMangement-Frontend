import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Room, RoomType } from '../../models/room.model';
import { Branch } from '../../models/branch.model';
import { RoomService } from '../../services/room.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html'
})
export class AddRoomComponent implements OnInit {

  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private branchService: BranchService
  ) {}

  roomForm = this.fb.nonNullable.group({
    branch_id: [0, Validators.required],
    price: [0, Validators.required],
    type: ['STANDARD' as RoomType, Validators.required],
    totalRoom: [0, Validators.required],
    available: [0, Validators.required]
  });

  ngOnInit(): void {
    this.branchService.getAllBranches()
  .subscribe({
    next: (response) => {
      if (response.success) {
        this.branches = response.data;
      }
    },
    error: (err: Error) => {
      alert(err.message);
    }
  });
  }

  addRoom(): void {

    if (this.roomForm.invalid) return;

    const value = this.roomForm.getRawValue();

    const room: Room = {
      id: 0,
      branch_id: value.branch_id,
      price: value.price,
      type: value.type,
      totalRoom: value.totalRoom,
      available: value.available
    };

    this.roomService.addRoom(room)
      .subscribe(() => {
        alert('Room Added Successfully');
        this.roomForm.reset();
      });
  }
}