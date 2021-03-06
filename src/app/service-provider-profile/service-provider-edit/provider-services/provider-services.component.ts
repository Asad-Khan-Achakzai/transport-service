import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController, IonContent, AlertController, ToastController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import {ServiceProvidersService} from '../../../sdk/custom/service-providers.service';
import {Routes} from '../../../sdk/custom/service-providers.service';
import { PopoverController } from '@ionic/angular';
import { DatePipe } from '@angular/common'
import { Route } from '@angular/compiler/src/core';

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
  timingValue;
  seatValue:number;
  routesCopy:[];
  from:string;
  buttonDisabled = true;
  firstIndexOfArrayDeleted = false;
  time;
  doneButtonDisable = true;
  //routes: Routes;
  routesArray: Routes[];
  //route:Routes;
cities = ['quetta','peshawer'];
@ViewChild(IonContent, { static: false }) content: IonContent;

  constructor( public toastController: ToastController,public alertController: AlertController,public datepipe: DatePipe,private popoverCtrl: PopoverController, private formBuilder: FormBuilder,private router :Router,private modalCtrl: ModalController,private serviceProviderServices: ServiceProvidersService) {
   
    this.Form = this.formBuilder.group({
      routes : [[
      ]],
      departureValue: [null],
      destinationValue: [null]
    });
    //this.routes = new Routes();
    this.routesArray = [new Routes] ;
    
  }
  ngOnInit() {
    console.log('services for =',this.serviceProviderServices.servicesForEditPage);
    this.routesArray = this.serviceProviderServices.servicesForEditPage;
    
  }
  nextButton(){
   // console.log(this.routesArray);
    this.serviceProviderServices.sendServices(this.routesArray);
      this.modalCtrl.dismiss({
        dismissed: true
      });
      }
      addRoute(){
     

        let  route:Routes ={
       timing : '',
       totalSeats : null,
        availableSeats:null,
        priceperSeat:null,
        departure : '',
        destination : '',
        paused: false
      };
        this.routesArray.unshift(route);
        this.content.scrollToTop(1500);
      }
      async deletRoute(index){
        let alert = await this.alertController.create({
          header: 'Confirm ',
          message: 'Are you sure to delete ?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'ok',
              handler: () => {
                this.routesArray.splice(index,1);
                console.log('Buy clicked');
              }
            }
          ]
        });
        alert.present();
      
        
      }

  //entering to the list

  async enterToTheList(){
    let test = false;
    for(let i = 0;i<this.routesArray.length;i++){
      if(this.routesArray[i].availableSeats===0 || this.routesArray[i].departure ===''|| this.routesArray[i].destination=== ''|| this.routesArray[i].timing===''|| this.routesArray[i].totalSeats===0|| this.routesArray[i].totalSeats=== null|| this.routesArray[i].availableSeats===null)
      {
        test = true;
        const toast = await this.toastController.create({
          message: 'please fill all fields',
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
      }
    }
    if(test !== true){
        this.serviceProviderServices.servicesForEditPage = this.routesArray;
     this.modalCtrl.dismiss();
    }
     console.log('routesArray =',this.routesArray);
   
//     //converting time to a readeable formate
//     this.timingValue=new Date(this.timingValue);
//     this.timingValue =this.datepipe.transform(this.timingValue, 'shortTime');
// //    console.log('time= ',this.timingValue);
//     //deleting first index
//     if(!this.firstIndexOfArrayDeleted){
//       this.routesArray.splice(0,1);
//       this.firstIndexOfArrayDeleted = true;
//     }
//   //  pushing routes to the array
//     this.routesArray.push({timing: this.timingValue,totalSeats: this.seatValue,availableSeats:this.seatValue,departure: this.departureValue,destination:this.destinationValue});
    
      
//     console.log(this.routesArray);
//     this.Form.value['routes'].push({Departure: this.departureValue , Destination : this.destinationValue});
//     this.routesCopy = this.Form.controls['routes'].value;

//     this.departureValue = '';
//     this.destinationValue = '';
//     this.timingValue = '';
//     this.seatValue = 0;
//     this.buttonDisabled = true;
//     this.doneButtonDisable = false;
//     console.log('RoutesCopy  = ',this.routesCopy);

  }
  async pauseButton(value,i){ 
    if(value){
      this.routesArray[i].paused = true;
      const toast = await this.toastController.create({
        message: 'route from '+this.routesArray[i].departure+ ' to '+ this.routesArray[i].destination +' is paused',
       // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
    else{
      this.routesArray[i].paused = false;
      const toast = await this.toastController.create({
        message: 'route from '+this.routesArray[i].departure+ ' to '+ this.routesArray[i].destination +' is live now',
       // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
    
  }
  delete(id: number): void{
    this.routesCopy.splice(id, 1);
    this.routesArray.splice(id, 1);
    console.log('Routess   ',this.routesArray);
    console.log('routesCopy   ',this.routesCopy);
    if(this.routesArray.length === 0){
      this.doneButtonDisable = true;
    }
  }
  updateDeparture(value,index){
    console.log('deapartute changed =',value);
    this.routesArray[index].departure = value;
    }
    updateDestination(value,index){
      this.routesArray[index].destination = value;
      }
      updateTiming(value,index){
        this.timingValue = new Date(value);
        this.timingValue = this.datepipe.transform(this.timingValue, 'shortTime');
        console.log('timing changed =',this.timingValue);
        this.routesArray[index].timing = this.timingValue;
        }
  test(value,index){
    this.routesArray[index].totalSeats = value;
    }
    updateAvailableSeats(value,index){
      this.routesArray[index].availableSeats = value;
    }
    async updateRoutePrice(value,index){
      if(value > 100 && value < 10000){
        this.routesArray[index].priceperSeat = value;
      }else{
        const toast = await this.toastController.create({
          message: 'not valid input so it will not be updated',
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
      }
      
    }
    updateButType(value,index){
      let seats;
      if (value === '2/2') {
        seats = 44;
        this.routesArray[index].availableSeats = seats;
      this.routesArray[index].totalSeats = seats;
      } else if (value=== '2/1') {
        seats= 24;
        this.routesArray[index].availableSeats = seats;
      this.routesArray[index].totalSeats = seats;
      } else if (value === '1/1') {
        seats = 18;
        this.routesArray[index].availableSeats = seats;
      this.routesArray[index].totalSeats = seats;
      } else {
        this.buttonDisabled = false;
      }
      
    }
    // test(event){
    //   if(this.departureValue != '' && this.destinationValue != ''&& this.timingValue != '' && this.seatValue != 0)
    //        this.buttonDisabled = false;
    //   }
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
