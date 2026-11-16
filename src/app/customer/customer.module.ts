import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomListComponent } from './room-list/room-list.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    RoomListComponent,
    BookRoomComponent,
    BookingHistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,   
    CustomerRoutingModule,
    MatButtonModule        
  ]
})
export class CustomerModule { }