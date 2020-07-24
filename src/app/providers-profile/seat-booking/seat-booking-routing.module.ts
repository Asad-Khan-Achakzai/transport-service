import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeatBookingPage } from './seat-booking.page';

const routes: Routes = [
  {
    path: '',
    component: SeatBookingPage
  },

  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeatBookingPageRoutingModule {}
