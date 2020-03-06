import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitiesTabPageRoutingModule } from './cities-tab-routing.module';

import { CitiesTabPage } from './cities-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitiesTabPageRoutingModule
  ],
  declarations: [CitiesTabPage]
})
export class CitiesTabPageModule {}
