import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './sdk/custom/guards/islogin.guard';
import { RedirectLoginGuard } from './sdk/custom/guards/redirectlogin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',    canActivate: [RedirectLoginGuard], loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'customer-sign-up',
    canActivate: [RedirectLoginGuard],
    loadChildren: () => import('./customer-sign-up/customer-sign-up.module').then(m => m.CustomerSignUpPageModule)
  },
  {
    path: 'service-provider-signup',
    loadChildren: () => import('./service-provider-signup/service-provider-signup.module').then(m => m.ServiceProviderSignupPageModule)
  },
  {
    path: 'customer-profile',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./customer-profile/customer-profile.module').then(m => m.CustomerProfilePageModule)
  },
  {
    path: 'service-provider-profile',
    loadChildren: () => import('./service-provider-profile/service-provider-profile.module').then(m => m.ServiceProviderProfilePageModule)
  },

  {
    path: 'customer-dashboard',
    children: [
      {
        path: '',
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardPageModule)
      },
      {
        path: ':providerID',
        loadChildren: () => import('./providers-profile/providers-profile.module')
          .then(m => m.ProvidersProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
