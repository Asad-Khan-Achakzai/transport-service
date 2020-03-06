import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesTabPageRoutingModule } from './routes-tab-routing.module';

import { RoutesTabPage } from './routes-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesTabPageRoutingModule
  ],
  declarations: [RoutesTabPage]
})
export class RoutesTabPageModule {}
