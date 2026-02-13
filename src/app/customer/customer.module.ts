import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { BookRoomComponent } from './book-room/book-room.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { RoomListComponent } from './room-list/room-list.component';


@NgModule({
  declarations: [
    BookRoomComponent,
    BookingHistoryComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
