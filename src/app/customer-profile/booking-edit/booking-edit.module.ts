import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingEditPageRoutingModule } from './booking-edit-routing.module';

import { BookingEditPage } from './booking-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingEditPageRoutingModule
  ],
  declarations: [BookingEditPage]
})
export class BookingEditPageModule {}
