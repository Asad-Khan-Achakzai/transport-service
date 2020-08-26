import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import { ServiceProvidersService } from '../../sdk/custom/service-providers.service';
import { Routes } from '../../sdk/custom/service-providers.service';
import { PopoverController } from '@ionic/angular';
import { DatePipe } from '@angular/common'

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
  destinationValue: string;
  timingValue;
  seatValue: string;
  routesCopy: [];
  from: string;
  buttonDisabled = true;
  firstIndexOfArrayDeleted = false;
  time;
  doneButtonDisable = true;
  numberOfSeats: number;
  pricePerSeat:number;
  //routes: Routes;
  routesArray: Routes[];
  cities = ['quetta', 'peshawer'];
  constructor(public toastController: ToastController,public datepipe: DatePipe, private popoverCtrl: PopoverController, private formBuilder: FormBuilder, private router: Router, private modalCtrl: ModalController, private serviceProviderServices: ServiceProvidersService) {

    this.Form = this.formBuilder.group({
      routes: [[
      ]],
      departureValue: [null],
      destinationValue: [null]
    });
    //this.routes = new Routes();
    this.routesArray = [new Routes];

  }
  ngOnInit() {

  }
  nextButton() {
    console.log(this.routesArray);
    this.serviceProviderServices.sendServices(this.routesArray);
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  //entering to the list

  async enterToTheList() {
    if(!(this.pricePerSeat > 100) || !(this.pricePerSeat < 10000)){
      const toast = await this.toastController.create({
        message: 'The price per seat should be greater than 100 and less than 10000',
       // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    
    }else{
      let departs = this.Form.value['departureValue'];
      let dests = this.Form.value['destinationValue'];
      
       console.log('searched value = ', departs);
       console.log('searched value = ', dests);
      console.log('seat = ', this.seatValue);
      //converting time to a readeable formate
      this.timingValue = new Date(this.timingValue);
      this.timingValue = this.datepipe.transform(this.timingValue, 'shortTime');
      //    console.log('time= ',this.timingValue);
      //deleting first index
      if (!this.firstIndexOfArrayDeleted) {
        this.routesArray.splice(0, 1);
        this.firstIndexOfArrayDeleted = true;
      }
      //  pushing routes to the array
      this.routesArray.push({ timing: this.timingValue, totalSeats: this.numberOfSeats, availableSeats: this.numberOfSeats,priceperSeat:this.pricePerSeat, departure: departs, destination:dests,paused:false});
  
  
      console.log(this.routesArray);
      this.Form.value['routes'].push({ Departure: departs, Destination: dests });
      this.routesCopy = this.Form.controls['routes'].value;
  
      this.Form.controls['departureValue'].setValue('');
      this.Form.controls['destinationValue'].setValue('');
      this.timingValue = '';
      this.seatValue = ' ';
      this.pricePerSeat = 0;
      this.buttonDisabled = true;
      this.doneButtonDisable = false;
      console.log('RoutesCopy  = ', this.routesCopy);
  
    }
    
  }
  delete(id: number): void {
    this.routesCopy.splice(id, 1);
    this.routesArray.splice(id, 1);
    console.log('Routess   ', this.routesArray);
    console.log('routesCopy   ', this.routesCopy);
    if (this.routesArray.length === 0) {
      this.doneButtonDisable = true;
    }
  }
  options() {
    if (this.departureValue != '' && this.destinationValue != '' && this.timingValue != ''&& this.pricePerSeat != null)
      this.buttonDisabled = false;
    if (this.seatValue === '2/2') {
      this.numberOfSeats = 44;
    } else if (this.seatValue === '2/1') {
      this.numberOfSeats = 24;
    } else if (this.seatValue === '1/1') {
      this.numberOfSeats = 18;
    } else {
      this.buttonDisabled = false;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
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
