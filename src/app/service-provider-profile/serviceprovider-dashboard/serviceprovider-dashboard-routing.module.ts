import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceproviderDashboardPage } from './serviceprovider-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceproviderDashboardPage
  },
  {
    path: 'route-bookings',
    loadChildren: () => import('./route-bookings/route-bookings.module').then( m => m.RouteBookingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceproviderDashboardPageRoutingModule {}
