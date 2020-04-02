import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoTabPage } from './info-tab.page';

const routes: Routes = [
  {
    path: '',
    component: InfoTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoTabPageRoutingModule {}
