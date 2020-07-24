import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderEditPageRoutingModule } from './service-provider-edit-routing.module';

import { ServiceProviderEditPage } from './service-provider-edit.page';
import { SharedModule } from '../../shared/shared.module';
import {ProviderServicesComponent} from './provider-services/provider-services.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceProviderEditPageRoutingModule
  ],
  declarations: [ServiceProviderEditPage,ProviderServicesComponent],
  entryComponents: [ProviderServicesComponent]
})
export class ServiceProviderEditPageModule {}
