import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'customer-sign-up',
    loadChildren: () => import('./customer-sign-up/customer-sign-up.module').then( m => m.CustomerSignUpPageModule)
  },
  {
    path: 'service-provider-signup',
    loadChildren: () => import('./service-provider-signup/service-provider-signup.module').then( m => m.ServiceProviderSignupPageModule)
  },
  {
    path: 'customer-profile',
    loadChildren: () => import('./customer-profile/customer-profile.module').then( m => m.CustomerProfilePageModule)
  },
  {
    path: 'service-provider-profile',
    loadChildren: () => import('./service-provider-profile/service-provider-profile.module').then( m => m.ServiceProviderProfilePageModule)
  },
  {
    path: 'routes-tab',
    loadChildren: () => import('./routes-tab/routes-tab.module').then( m => m.RoutesTabPageModule)
  },
  {
    path: 'info-tab',
    loadChildren: () => import('./info-tab/info-tab.module').then( m => m.InfoTabPageModule)
  },
  {
    path: 'cities-tab',
    loadChildren: () => import('./cities-tab/cities-tab.module').then( m => m.CitiesTabPageModule)
  },
  {
    path: 'info-tab',
    loadChildren: () => import('./info-tab/info-tab.module').then( m => m.InfoTabPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
