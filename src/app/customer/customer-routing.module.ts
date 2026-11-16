import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomListComponent } from './room-list/room-list.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'book-room/:id', component: BookRoomComponent },
  { path: 'history', component: BookingHistoryComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }