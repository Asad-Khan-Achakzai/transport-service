import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteBookingsPageRoutingModule } from './route-bookings-routing.module';

import { RouteBookingsPage } from './route-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouteBookingsPageRoutingModule
  ],
  declarations: [RouteBookingsPage]
})
export class RouteBookingsPageModule {}
