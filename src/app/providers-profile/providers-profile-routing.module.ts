import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersProfilePage } from './providers-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersProfilePageRoutingModule {}
