import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderSignupPageRoutingModule } from './service-provider-signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {ProviderServicesComponent} from './provider-services/provider-services.component';
import { ServiceProviderSignupPage } from './service-provider-signup.page';
import {MasksModule} from '../masks/masks.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasksModule,
    ReactiveFormsModule,
    ServiceProviderSignupPageRoutingModule
  ],
  
  declarations: [ServiceProviderSignupPage,ProviderServicesComponent],
  entryComponents: [ProviderServicesComponent]
})
export class ServiceProviderSignupPageModule {}
