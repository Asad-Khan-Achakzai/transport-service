import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersProfilePage } from './providers-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersProfilePage
  },
  {
    path: 'seat-booking',
    loadChildren: () => import('./seat-booking/seat-booking.module').then( m => m.SeatBookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersProfilePageRoutingModule {}
