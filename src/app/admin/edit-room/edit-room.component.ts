import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomType } from '../../models/room.model';
import { Branch } from '../../models/branch.model';
import { RoomService } from '../../services/room.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html'
})
export class EditRoomComponent implements OnInit {

  roomId!: number;
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.roomId = Number(idParam);

    // Load branches
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
    // Load room by ID
    this.roomService.getRoomById(this.roomId)
  .subscribe({
    next: (response) => {
      if (response.success && response.data) {
        this.roomForm.patchValue(response.data);
      }
    },
    error: (err) => {
      alert(err.error?.message || 'Failed to load room');
    }
  });
  }

  updateRoom(): void {

    if (this.roomForm.invalid) return;

    const value = this.roomForm.getRawValue();

    const updatedRoom: Room = {
      id: this.roomId,
      branch_id: value.branch_id,
      price: value.price,
      type: value.type,
      totalRoom: value.totalRoom,
      available: value.available
    };

    this.roomService.updateRoom(updatedRoom)
      .subscribe(() => {
        alert('Room Updated Successfully');
        this.router.navigate(['/admin/rooms']);
      });
  }
}