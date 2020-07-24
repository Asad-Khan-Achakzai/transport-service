import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderProfilePage } from './service-provider-profile.page';
import { ProviderRedirectLoginGuard } from '../sdk/custom/guards/providerRredirectlogin.guard';
const routes: Routes = [
  {
    path: '',
    component: ServiceProviderProfilePage
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'serviceprovider-dashboard',
    loadChildren: () => import('./serviceprovider-dashboard/serviceprovider-dashboard.module').then( m => m.ServiceproviderDashboardPageModule)
  },
  {
    path: 'service-provider-edit',
    
    loadChildren: () => import('./service-provider-edit/service-provider-edit.module').then( m => m.ServiceProviderEditPageModule)
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
