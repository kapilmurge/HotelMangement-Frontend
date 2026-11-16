import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
  this.roomService.getAllRooms()
    .subscribe({
      next: (response) => {
        if (response.success) {
          this.rooms = response.data;
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    });
  }

  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id)
      .subscribe(() => {
        this.loadRooms();
      });
  }

  editRoom(id: number): void {
  this.router.navigate(['/admin/edit-room', id]);
}
}