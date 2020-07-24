import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderEditPage } from './service-provider-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderEditPageRoutingModule {}
