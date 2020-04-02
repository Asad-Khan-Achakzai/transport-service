import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesTabPage } from './services-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesTabPageRoutingModule {}
