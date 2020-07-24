import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { DatePipe } from '@angular/common';
import { MenuController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manual-booking',
  templateUrl: './manual-booking.page.html',
  styleUrls: ['./manual-booking.page.scss'],
})
export class ManualBookingPage implements OnInit {
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


  bookedSeats:string[]= [];;
  price = 0;
  routeId:string;
  providerId:string;
  routeTiming:string;
  customerId:string;
  route;
  alreadBookedSeats = ['0A', '0b'];
  customerName;
  customerAddress;
  customerPhone;
  date;
  totalSeats;
  pricePerSeat: number;
  timingValue;
  constructor(public datepipe: DatePipe,private menu: MenuController,public toastController: ToastController,public alertController: AlertController,private customerService:CustomersService,private bookingsService:BookingsService, private serviceProviderServices: ServiceProvidersService) { }

  async ngOnInit() {
    let route = await this.bookingsService.getBookingroute();
    console.log('route = ',route);
    //this.bookedSeats = route.bookedSeats;
    this.routeId = route.id;
    this.totalSeats = route.totalSeats;
    this.pricePerSeat = route.priceperSeat;
    this.alreadBookedSeats = route.bookedSeats;
    this.providerId = await this.serviceProviderServices.getServiceProviderId();
    this.routeTiming = route.timing;
    console.log('this.bookedSeats = ',this.bookedSeats);
    console.log('this.routeId = ',this.routeId);
    console.log('provider di = ',this.providerId);
    this.bookingsService.getInvoiceServiceProvider(this.providerId);
    // this.alreadBookedSeats = this.serviceProviderServices.routeForManualBooking.bookedSeats;
    // this.routeId = this.serviceProviderServices.routeForManualBooking.id;
  }
  checkValue(condition,value){
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
    // console.log('value = ',value,'condition = ',condition)
    // if(condition===true)
    // {
    //   this.price = this.price+300;
    //   console.log('price = ',this.price)
    //   this.bookedSeats.push(value);
      
    // }
    // if(condition===false)
    // { 
    //   let index = this.bookedSeats.indexOf(value);
    //   console.log(index);
    //   this.bookedSeats.splice(index,1);
    //   this.price =this.price-300;
    // }
    // console.log('array = ',this.bookedSeats);
  }
  
 
  async saveData(){
    
    if(this.timingValue && this.customerName && this.customerPhone ){
      this.timingValue = new Date(this.timingValue);
      this.timingValue = this.datepipe.transform(this.timingValue, 'mediumDate');
          console.log('time= ',this.timingValue);
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
       // message: 'Are you sure to select these <strong>seats</strong>!!!',
       inputs: [  
        {  
          type: 'text',  
          value: 'customer Name: '+this.customerName,   
        },
        {  
          type: 'text',  
          value: 'phone#: '+this.customerPhone,   
        },    
        {  
          type: 'text',  
          value: 'Seats: '+this.bookedSeats,   
        },  
        {  
          type: 'text',  
          value: 'Price = '+this.price.toString(), 
        },  
        {  
          type: 'text',  
          value: 'Date = '+this.timingValue, 
        },  
      ], 
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
  
              this.bookingsService.bookingRegister({ id: 'no Id', price: this.price, seats: this.bookedSeats, routId: this.routeId, customerId: this.customerName, providerId: this.providerId, timing: this.routeTiming,date:this.timingValue, expire: false }).subscribe(
                async data => {
                  console.log('got response from server', data);
                  this.bookingsService.saveBookingId(data.id);
                  const toast = await this.toastController.create({
                    message: data.message,
                   // message: `${name} has been saved successfully.`,
                    duration: 3500
                  });
                  toast.present();
                  this.bookingsService.makePdfOfManual(this.customerName,this.pricePerSeat,this.customerPhone,this.date,this.bookedSeats,this.price,this.routeTiming);
                  // this.router.navigateByUrl('providers-profile/seat-booking/invoice');
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
        message: 'please select  date or other fields',
        buttons: ['OK']
      });
      alert.present();
    }

    // console.log('functionc called');
    // const observable = await this.serviceProviderServices.updateServiceProvider({id:this.routeId,bookedSeats:this.bookedSeats});
    // observable.subscribe(
    //   data => {
    //     console.log('got response of update from server', data);
    //   for(let i =0;i<this.bookedSeats.length;i++){
    //     this.alreadBookedSeats.push(this.bookedSeats[i]);}
    //   },
    //   error => {
    //     console.log('error', error);
    //   }
    // );
    // this.bookingsService.getInvoiceServiceProvider(this.serviceProviderServices.serviceProviderIdInbox);
    // this.bookingsService.makePdfForManualBooking(this.customerName,this.customerAddress,this.customerPhone,this.date,this.bookedSeats,this.price);
    // this.bookingsService.bookingRegister({price:this.price,seats:this.bookedSeats,routId:this.routeId,customerId:this.customerId,providerId:this.providerId,timing:this.routeTiming}).subscribe(
    //   data => {
    //     console.log('got response from server', data);
   
    //    // this.router.navigateByUrl('/home');
    //   },
    //   error => {
      
    //     console.log('error', error);
    //   }
    // );
   }

}
