import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesTabPageRoutingModule } from './services-tab-routing.module';

import { ServicesTabPage } from './services-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesTabPageRoutingModule
  ],
  declarations: [ServicesTabPage]
})
export class ServicesTabPageModule {}
