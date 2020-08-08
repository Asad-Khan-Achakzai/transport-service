import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { Router } from '@angular/router';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { ToastController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-booking-cart',
  templateUrl: './booking-cart.page.html',
  styleUrls: ['./booking-cart.page.scss'],
})
export class BookingCartPage implements OnInit {
booking:Booking[];
customerId;
loading = true;
skeletonlist = [1, 2, 3, 4, 5];
noBooking= false;
customerName;
  constructor(private menu: MenuController,public alertController: AlertController,public toastController: ToastController, private serviceProviderServices: ServiceProvidersService,private router: Router,private bookingsService:BookingsService, private customerService: CustomersService) { }
  async refreshPage(event) { 
    
    this.loading = true;
    this.customerId = await this.customerService.getCustomerId();
    this.customerName = await this.customerService.getCustomerName();
      this.getBooking();
   // if(this.completed){
   //   this.loading = false;
   //   event.target.complete();
   //   this.completed = false;
   // }
   setTimeout(() => {
     console.log('Async operation has ended');
     event.target.complete();
   }, 1000);
  }
  async ngOnInit() {
    //after reload the image in side menu is lost so here i send again the picture
    let img  = await this.customerService.getCustomerImg();
    this.customerService.publishSomeData({
      customerImg: img
    })
  this.customerId = await this.customerService.getCustomerId();
  this.customerName = await this.customerService.getCustomerName();
    this.getBooking();
  }
  async ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    this.customerId = await this.customerService.getCustomerId();
  this.customerName = await this.customerService.getCustomerName();
    this.getBooking();
    
  }
  async edit(index){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure to  <strong>Delete</strong>!!!',
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
            let id = this.booking[index].id;
            this.updateServiceProviderRoute(id,this.booking[index],index);
          }
        }
      ]
    });
    await alert.present();
   
 ///   this.deletBooking(id);
    // this.bookingsService.saveBookingForEdit(this.booking[index]);
    // this.router.navigateByUrl('customer-profile/booking-edit');
  }
  // async deletBooking(id){
  //   const observable = await this.bookingsService.deleteBooking(id);
  //   observable.subscribe(
  //     data => {
  //       console.log('response =',data);
     
        
  //     },
  //     err => {
  //       console.log('err', err);
  //     });
  // }
  async presentToast(message){
    const toast = await this.toastController.create({
      message: message,
     // message: `${name} has been saved successfully.`,
      duration: 3500
    });
    toast.present();
  }
  async updateServiceProviderRoute(id,booking,index){
    const observable=  await this.serviceProviderServices.editRouteOfServiceProvider(id,booking);
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        this.presentToast(data.message);
        //this.loading = false;
        const observable = await this.bookingsService.deleteBooking(id);
        observable.subscribe(
          data => {
            console.log('response =',data);
            this.booking.splice(index,1);
            this.presentToast(data.message);
            
          },
          err => {
            console.log('err', err);
          });
        
      },
      async error => {
        this.loading = false;
        console.log('error', error);
       
      }
    );
  }
  
  async  getBooking() {
    const observable = await this.bookingsService.getBooking(this.customerId);
    observable.subscribe(
      data => {
        this.booking = data.data;
        console.log('object = ',data);
        console.log('booking = ',this.booking);
        if(this.booking.length ===0){
          this.noBooking = true;
        }
        this.loading= false;
        // this.id = this.costomerInfo._id;
        // this.email = this.costomerInfo.email;
        // this.userName = this.costomerInfo.username;
        // this.phone = this.costomerInfo.phone;
        // this.cnic = this.costomerInfo.cnic;
        // this.customerService.customerName = this.costomerInfo.username;
        // this.customerService.logedInCustomerId = this.costomerInfo._id
        //console.log('data', data.data);
      },
      err => {
        console.log('err', err);
      },
     
    );
  }


}
interface Booking{
  id:string,
  price:number,
  seats:Array<string>,
  routId:string,
  customerId:string,
  providerId:string,
  timing:string,
  expire:boolean
}
