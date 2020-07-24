import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingCartPageRoutingModule } from './booking-cart-routing.module';

import { BookingCartPage } from './booking-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingCartPageRoutingModule
  ],
  declarations: [BookingCartPage]
})
export class BookingCartPageModule {}
