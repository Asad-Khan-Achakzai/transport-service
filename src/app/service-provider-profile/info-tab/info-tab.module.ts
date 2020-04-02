import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoTabPageRoutingModule } from './info-tab-routing.module';

import { InfoTabPage } from './info-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoTabPageRoutingModule
  ],
  declarations: [InfoTabPage]
})
export class InfoTabPageModule {}
