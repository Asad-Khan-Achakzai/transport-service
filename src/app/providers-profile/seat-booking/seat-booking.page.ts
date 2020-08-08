import { Component, OnInit } from '@angular/core';
//import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { Router } from '@angular/router';
import { CustomersService } from '../../sdk/custom/customers.service';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { error } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.page.html',
  styleUrls: ['./seat-booking.page.scss'],
})
export class SeatBookingPage implements OnInit {
  isChecked;
  isChecked1b;
  isChecked1c;
  isChecked1d;

  isChecked2a;
  isChecked2b;
  isChecked2c;
  isChecked2d;

  isChecked3a;
  isChecked3b;
  isChecked3c;
  isChecked3d;

  isChecked4a;
  isChecked4b;
  isChecked4c;
  isChecked4d;

  isChecked5a;
  isChecked5b;
  isChecked5c;
  isChecked5d;

  isChecked6a;
  isChecked6b;
  isChecked6c;
  isChecked6d;

  isChecked7a;
  isChecked7b;
  isChecked7c;
  isChecked7d;

  isChecked8a;
  isChecked8b;
  isChecked8c;
  isChecked8d;

  isChecked9a;
  isChecked9b;
  isChecked9c;
  isChecked9d;

  isChecked10a;
  isChecked10b;
  isChecked10c;
  isChecked10d;

  isChecked11a;
  isChecked11b;
  isChecked11c;
  isChecked11d;



  bookedSeats: string[] = [];;
  price = 0;
  routeId: string;
  providerId: string;
  routeTiming: string;
  customerId: string;
  route;
  alreadBookedSeats = ['0A', '0b'];
  totalSeats;
  pricePerSeat: number;
  timingValue;
  loading =true;
  skeletonlist = [1,2,3,4,5];
  constructor(public datepipe: DatePipe,private menu: MenuController,public toastController: ToastController,public alertController: AlertController, private customerService: CustomersService, private bookingsService: BookingsService, private serviceProviderServices: ServiceProvidersService, private router: Router) { 
    
   
  }
  async refreshPage(event) { 
    
    this.loading = true;
    this.loadIds();
   // if(this.completed){
   //   this.loading = false;
   //   event.target.complete();
   //   this.completed = false;
   // }
   setTimeout(() => {
     event.target.complete();
   }, 1000);
  }

   ngOnInit() {

    this.loadIds();

  }
  
  ionViewDidEnter() {
    
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    this.loadIds();
  
    
  }
  async loadIds() {
    // let routes = await this.customerService.getProviderRoute();
    // console.log('route = ',routes);
    this.routeId = await this.customerService.getroute_id();
    this.providerId = await this.customerService.getproviderID();
    this.routeTiming = await this.customerService.getrouteTiming();
    this.customerId = await this.customerService.getCustomerId();
    this.alreadBookedSeats = await this.customerService.getbookedSeats();
    this.totalSeats = await this.customerService.getTotalSeats();
    this.pricePerSeat = await this.customerService.getRoutePrice();

   this.loading = false;

   //assigning time of departure
   let today: number = Date.now();
   console.log('this.timingValue = ',this.timingValue);
   let time = new Date("1990-01-01 "+this.datepipe.transform(today, 'shortTime'));
   let routeTime = new Date("1990-01-01 "+this.routeTiming);
   //if time has passed the todays bus departure time then assing tomorrows date else assing todays date
   if(time > routeTime){
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log('tomorrows date',this.datepipe.transform(tomorrow, 'longDate'));
    this.timingValue = this.datepipe.transform(tomorrow, 'longDate');
   }else{
    let today: number = Date.now();
    let date = this.datepipe.transform(today, 'longDate');
    this.timingValue = date;
   }
   

   console.log('todays time = ',time);
    console.log('price =', this.pricePerSeat);
    console.log('booked  = ', this.totalSeats);
    console.log('booked already = ', this.alreadBookedSeats);
    console.log('routeId  =', this.routeId);
    console.log('providerId =', this.providerId);
    console.log('customerID = ', this.customerId)
    console.log('timing =', this.routeTiming);
    //console.log('route =',this.route);
  }
  checkValue(condition, value) {

    console.log('value = ', value, 'condition = ', condition)
    if (condition === true) {
      this.price = Number.parseInt(this.price.toString());
      this.pricePerSeat = Number.parseInt(this.pricePerSeat.toString());
      //this.price = Number.parseInt(this.price.toString())+this.pricePerSeat;
      this.price = this.price + this.pricePerSeat;
      console.log('price = ', this.price)
      this.bookedSeats.push(value);

    }
    if (condition === false) {
      let index = this.bookedSeats.indexOf(value);
      console.log(index);
      this.bookedSeats.splice(index, 1);
      this.price = this.price - this.pricePerSeat;
      console.log('price = ', this.price)
    }
    console.log('array = ', this.bookedSeats);
  }

  checkArray() {
    console.log('called');
    return true;
  }
  async saveData() {
    //this.router.navigateByUrl('providers-profile/seat-booking/invoice');

        if(this.timingValue ){
          this.timingValue = new Date(this.timingValue);
          this.timingValue = this.datepipe.transform(this.timingValue, 'mediumDate');
              console.log('time= ',this.timingValue);
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Are you sure to select these <strong>seats</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                handler: async () => {
                   
                  //this.bookingsService.putInvoiceData({ id: 'no Id', price: this.price, seats: this.bookedSeats, routId: this.routeId, customerId: this.customerId, providerId: this.providerId, timing: this.routeTiming });
                  // console.log('functionc called');
                   const observable = await this.serviceProviderServices.updateServiceProvider({ id: this.routeId, bookedSeats: this.bookedSeats });
                  observable.subscribe(
                    data => {
                      console.log('got response of update from server', data);
      
                    },
                     async error => {
                    const toast = await this.toastController.create({
                      message: error.error.message,
                     // message: `${name} has been saved successfully.`,
                      duration: 3500
                    });
                    toast.present();
                    }
                  );
      
                  this.bookingsService.bookingRegister({ id: 'no Id', price: this.price, seats: this.bookedSeats, routId: this.routeId, customerId: this.customerId, providerId: this.providerId, timing: this.routeTiming,date:this.timingValue, expire: false }).subscribe(
                    async data => {
                      console.log('got response from server', data);
                      this.bookingsService.saveBookingId(data.id);
                      const toast = await this.toastController.create({
                        message: data.message,
                       // message: `${name} has been saved successfully.`,
                        duration: 3500
                      });
                      toast.present();
                      this.router.navigateByUrl('providers-profile/seat-booking/invoice');
                      // this.router.navigateByUrl('/home');
                    },
                    async error => {
      
                      const toast = await this.toastController.create({
                        message: error.error.message,
                       // message: `${name} has been saved successfully.`,
                        duration: 3500
                      });
                      toast.present();
                  
                    }
                  );
                }
              }
            ]
          });
      
          await alert.present();
      
      
        }else{
          const alert = await this.alertController.create({
            header: 'Alert',
            //subHeader: 'Subtitle',
            message: 'please select journey date',
            buttons: ['OK']
          });
          alert.present();
        }

         
  }
}
// interface route{
//   id:string,
//   timing:string,
//   totalSeats:string,
//   availableSeats:string,
//   departure:string,
//   destination:string,
//   bookedSeats:Array<string>

// }
