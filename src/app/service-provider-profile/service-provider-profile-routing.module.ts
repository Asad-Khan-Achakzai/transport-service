import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderProfilePage } from './service-provider-profile.page';
const routes: Routes = [
  {
    path: '',
    component: ServiceProviderProfilePage
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  }
];
// const routes: Routes = [
//   {
//     path: 'service-provider-profile',
//     component: ServiceProviderProfilePage,
//     children:[
//         { path: 'info-tab', loadChildren: './info-tab/info-tab.module#InfoTabPageModule' },
//         { path: 'routes-tab', loadChildren: './routes-tab/routes-tab.module#RoutesTabPageModule' },
//         { path: 'cities-tab', loadChildren: './services-tab/services-tab.module#ServicesTabPageModule' },
//     ]
//   },
//   {
//     path:'',
//     redirectTo:'service-provider-profile/info-tab',
//     pathMatch:'full'
//   }
// ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderProfilePageRoutingModule {}
