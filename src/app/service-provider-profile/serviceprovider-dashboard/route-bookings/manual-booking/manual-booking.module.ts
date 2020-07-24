import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MasksModule} from '../../../../masks/masks.module';
import { IonicModule } from '@ionic/angular';

import { ManualBookingPageRoutingModule } from './manual-booking-routing.module';

import { ManualBookingPage } from './manual-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasksModule,
    ManualBookingPageRoutingModule
  ],
  declarations: [ManualBookingPage]
})
export class ManualBookingPageModule {}
