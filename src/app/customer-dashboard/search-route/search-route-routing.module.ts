import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRoutePage } from './search-route.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRoutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutePageRoutingModule {}
