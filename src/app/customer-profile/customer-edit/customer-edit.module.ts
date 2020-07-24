import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerEditPageRoutingModule } from './customer-edit-routing.module';

import { CustomerEditPage } from './customer-edit.page';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    CustomerEditPageRoutingModule
  ],
  declarations: [CustomerEditPage]
})
export class CustomerEditPageModule {}
