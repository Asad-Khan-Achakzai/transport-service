import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSignUpPage } from './customer-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSignUpPageRoutingModule {}
