import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchRoutePageRoutingModule } from './search-route-routing.module';

import { SearchRoutePage } from './search-route.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRoutePageRoutingModule
  ],
  declarations: [SearchRoutePage]
})
export class SearchRoutePageModule {}
