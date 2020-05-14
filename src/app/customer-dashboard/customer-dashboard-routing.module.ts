import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDashboardPage } from './customer-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardPage,
    children: [
      {
        path: 'search-route',
        loadChildren: () => import('./search-route/search-route.module').then( m => m.SearchRoutePageModule)
      },
    
      {
        path: 'search-company',
        loadChildren: () => import('./search-company/search-company.module').then(m => m.SearchCompanyPageModule)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardPageRoutingModule { }
