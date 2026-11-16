import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-customer-room-list',
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  bookRoom(id: number): void {
    this.router.navigate(['/customer/book-room', id]);
  }
}