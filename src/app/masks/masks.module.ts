import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnicMaskDirective } from './cnic-mask.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './phone-mask.directive';



@NgModule({
  declarations: [CnicMaskDirective, PhoneMaskDirective],
  exports: [CnicMaskDirective,PhoneMaskDirective],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MasksModule { }
