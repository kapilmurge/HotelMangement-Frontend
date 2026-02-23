import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },

  { path: 'add-hotel', component: AddHotelComponent },
  { path: 'hotels', component: HotelListComponent },

  { path: 'add-branch', component: AddBranchComponent },
  { path: 'branches', component: BranchListComponent },

  { path: 'add-room', component: AddRoomComponent },
  { path: 'rooms', component: RoomListComponent },

  { path: 'edit-room/:id', component: EditRoomComponent },
  { path: 'edit-hotel/:id', component: EditHotelComponent },
  { path: 'edit-branch/:id', component: EditBranchComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }