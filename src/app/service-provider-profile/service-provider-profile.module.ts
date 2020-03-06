import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderProfilePageRoutingModule } from './service-provider-profile-routing.module';

import { ServiceProviderProfilePage } from './service-provider-profile.page';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceProviderProfilePageRoutingModule
  ],
  declarations: [ServiceProviderProfilePage]
})
export class ServiceProviderProfilePageModule {}
