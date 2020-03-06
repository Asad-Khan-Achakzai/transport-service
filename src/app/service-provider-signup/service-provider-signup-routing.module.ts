import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderSignupPage } from './service-provider-signup.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderSignupPageRoutingModule {}
