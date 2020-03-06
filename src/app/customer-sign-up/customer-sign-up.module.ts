import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerSignUpPageRoutingModule } from './customer-sign-up-routing.module';

import { CustomerSignUpPage } from './customer-sign-up.page';
import {MasksModule} from '../masks/masks.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MasksModule,
    CustomerSignUpPageRoutingModule
  ],
  declarations: [CustomerSignUpPage]
})
export class CustomerSignUpPageModule {}
