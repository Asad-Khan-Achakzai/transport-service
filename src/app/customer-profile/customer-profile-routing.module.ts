import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerProfilePage } from './customer-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerProfilePage
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'booking-cart',
    loadChildren: () => import('./booking-cart/booking-cart.module').then( m => m.BookingCartPageModule)
  },
  {
    path: 'customer-edit',
    loadChildren: () => import('./customer-edit/customer-edit.module').then( m => m.CustomerEditPageModule)
  },
  {
    path: 'booking-edit',
    loadChildren: () => import('./booking-edit/booking-edit.module').then( m => m.BookingEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerProfilePageRoutingModule {}
