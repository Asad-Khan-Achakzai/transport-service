import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatBookingPageRoutingModule } from './seat-booking-routing.module';

import { SeatBookingPage } from './seat-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatBookingPageRoutingModule
  ],
  declarations: [SeatBookingPage]
})
export class SeatBookingPageModule {}
