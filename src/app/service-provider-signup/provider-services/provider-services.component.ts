import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import {ServiceProvidersService} from '../../sdk/custom/service-providers.service';
import {Routes} from '../../sdk/custom/service-providers.service';
import { PopoverController } from '@ionic/angular';
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
  //routes: Routes;
  routesArray: Routes[];
cities = ['quetta','peshawer'];
  constructor(private popoverCtrl: PopoverController, private formBuilder: FormBuilder,private router :Router,private modalCtrl: ModalController,private serviceProviderServices: ServiceProvidersService) {
    this.Form = this.formBuilder.group({
      routes : [[
      ]],
      to:[null,[Validators.required]],
      from:[null,[Validators.required]]
    });
    //this.routes = new Routes();
    this.routesArray = [new Routes] ;
    
  }
  ngOnInit() {
    
  }
  nextButton(){
   // console.log(this.routesArray);
    this.serviceProviderServices.sendServices(this.routesArray);
      this.modalCtrl.dismiss({
        dismissed: true
      });
      }

  //entering to the list

  enterToTheList(){
    //console.log(this.timingValue);
  //  pushing routes to the array
    this.routesArray.push({timing: this.timingValue,totalSeats: this.seatValue,availableSeats:this.seatValue,departure: this.departureValue,destination:this.destinationValue});
    this.routesArray.splice(0,1);
    console.log(this.routesArray);
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
