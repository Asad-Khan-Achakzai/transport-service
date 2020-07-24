import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceproviderDashboardPageRoutingModule } from './serviceprovider-dashboard-routing.module';

import { ServiceproviderDashboardPage } from './serviceprovider-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceproviderDashboardPageRoutingModule
  ],
  declarations: [ServiceproviderDashboardPage]
})
export class ServiceproviderDashboardPageModule {}
