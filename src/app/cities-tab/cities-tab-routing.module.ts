import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitiesTabPage } from './cities-tab.page';

const routes: Routes = [
  {
    path: '',
    component: CitiesTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitiesTabPageRoutingModule {}
