import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './sdk/custom/guards/islogin.guard';
import { RedirectLoginGuard } from './sdk/custom/guards/redirectlogin.guard';
import { ProviderRedirectLoginGuard } from './sdk/custom/guards/providerRredirectlogin.guard';

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
    canActivate: [ProviderRedirectLoginGuard],
    loadChildren: () => import('./service-provider-signup/service-provider-signup.module').then(m => m.ServiceProviderSignupPageModule)
  },
  {
    path: 'customer-profile',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./customer-profile/customer-profile.module').then(m => m.CustomerProfilePageModule)
  },
  // providers profile is added here becouse without this in the providers profile it will not navigate to seat-booking
  {
    path: 'providers-profile',
    loadChildren: () => import('./providers-profile/providers-profile.module').then(m => m.ProvidersProfilePageModule)
  },
  {
    path: 'service-provider-profile',
    canActivate: [IsLoginGuard],
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
        path: 'search-route',
        children: [{
          path: '',
          loadChildren: () => import('./customer-dashboard/search-route/search-route.module').then(m => m.SearchRoutePageModule)
        },
        {
          path: ':providerID',
          loadChildren: () => import('./providers-profile/providers-profile.module')
            .then(m => m.ProvidersProfilePageModule)
        }
      ]

      },
      {
        path: 'search-company',
        loadChildren: () => import('./customer-dashboard/search-company/search-company.module').then(m => m.SearchCompanyPageModule)
      }
    ]
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
