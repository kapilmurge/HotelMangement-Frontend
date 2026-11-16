import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddHotelComponent,
    HotelListComponent,
    AddBranchComponent,
    BranchListComponent,
    AddRoomComponent,
    RoomListComponent,
    EditRoomComponent,
    EditHotelComponent,
    EditBranchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }