import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegisterationComponent } from '../registeration/registeration.component';
import { RegistrationComponent } from './registration.component';


@NgModule({
  declarations: [
    RegisterationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
