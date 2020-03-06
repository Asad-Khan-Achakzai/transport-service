import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import {ServiceProvidersService} from '../../sdk/custom/service-providers.service';
//import {Routes} from '../../sdk/custom/service-providers.service';

@Component({
  selector: 'app-provider-services',
  templateUrl: './provider-services.component.html',
  styleUrls: ['./provider-services.component.scss'],
})
export class ProviderServicesComponent implements OnInit {
loading = false;
  Form: FormGroup;
  Departure: string;
  Destination: string;
  departureValue: string;
  destinationValue:string;
  timingValue:string;
  seatValue:number;
  routesCopy:[];
  from:string;
  buttonDisabled = true;
  // routes: Routes;
  // routesArray: Routes[];
cities = ['quetta','peshawer'];
  constructor(private formBuilder: FormBuilder,private router :Router,private modalCtrl: ModalController,private serviceProviderServices: ServiceProvidersService) {
    this.Form = this.formBuilder.group({
      routes : [[
      ]],
      to:[null,[Validators.required]],
      from:[null,[Validators.required]]
    });
  }
  ngOnInit() {
  }
  nextButton(){
//    console.log(this.routesArray);
    this.serviceProviderServices.sendServices(this.routesCopy);
      this.modalCtrl.dismiss({
        dismissed: true
      });
      }
  // get departureValue(): string {
  //   return this.Form.value['departure'];
  // }
  // get destinationValue(): string {
  //   return this.Form.value['destination'];
  // }
  enterToTheList(){
    // this.routes.timing = this.timingValue;
    // this.routes.totalSeats = this.seatValue;
    // this.routes.departure = this.departureValue;
    // this.routes.destination = this.destinationValue;
    // this.routesArray.push(this.routes);
    this.Form.value['routes'].push({Departure: this.departureValue , Destination : this.destinationValue});
    this.routesCopy = this.Form.controls['routes'].value;
    this.departureValue = '';
    this.destinationValue = '';
    this.buttonDisabled = true;
  }
  delete(id: number): void{
    this.routesCopy.splice(id, 1);  }
    test(event){
      if(this.departureValue != '' && this.destinationValue != ''&& this.timingValue != '' && this.seatValue != 0)
           this.buttonDisabled = false;
      }
  // delet(item)
  // {
  //   //console.log("dlete Function");
  //   //console.log(item.destination);
  // }
  // nextButton(){
  //   console.log(this.Form.value);
  //   this.customerService.serviceProviderRegister(this.Form.value).subscribe(
  //     data => {
  //       console.log('got response from server', data);
  //       this.loading = false;
  //     },
  //     error => {
  //       this.loading = false;
  //       console.log('error', error);
  //     }
  //   );
  //  }
  }
