import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingCartPage } from './booking-cart.page';

const routes: Routes = [
  {
    path: '',
    component: BookingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingCartPageRoutingModule {}
