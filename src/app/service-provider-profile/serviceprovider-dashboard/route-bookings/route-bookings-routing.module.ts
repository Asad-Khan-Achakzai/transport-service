import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteBookingsPage } from './route-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: RouteBookingsPage
  },
  {
    path: 'booking-details',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'manual-booking',
    loadChildren: () => import('./manual-booking/manual-booking.module').then( m => m.ManualBookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteBookingsPageRoutingModule {}
