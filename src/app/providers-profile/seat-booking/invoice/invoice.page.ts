import { Component, OnInit } from '@angular/core';
import { BookingsService, Booking } from 'src/app/sdk/custom/bookings.service';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { MenuController, AlertController, ToastController, Platform } from '@ionic/angular';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  bookingId;
  booking: Booking;
  customerName;
  numberOfSeats;
  price;
  seats: string[];
  loading = false;
  skeletonlist = [1, 2, 3, 4, 5];
  disabled = true;
  date;
  sub: any;
  constructor(private location: PlatformLocation, private platform: Platform, private router: Router, private serviceProviderServices: ServiceProvidersService, private menu: MenuController, public alertController: AlertController, public toastController: ToastController, private customerService: CustomersService, private bookingsService: BookingsService) {
    this.location.onPopState(()=>{
      console.log('backbutton pressed');
      //window.history.pushState( '/customer-profile' , null );
      //history.go(0)
      window.location.assign('/customer-dashboard');
      //window.history.pushState( {} , 'invoice', '/providers-profile/seat-booking' ); 
      //history.pushState(null, null, '/customer-profile');
      
          });
  }

  async ngOnInit() {
    this.bookingId = await this.bookingsService.getBookingId()
    this.customerName = await this.customerService.getCustomerName();
    console.log('id =', this.bookingId);
    this.getBooking();
  }
  ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
  }
  makePdf() {
    this.bookingsService.makePdf(this.booking);
  }
  async getBooking() {
    this.loading = true;
    const observable = await this.bookingsService.getBookingObject(this.bookingId);
    observable.subscribe(
      data => {
        //this.booking = data.data;
        console.log('object = ', data.data);
        this.booking = data.data[0];
        console.log('booking =', this.booking);
        this.price = this.booking.price;
        this.seats = this.booking.seats.slice();
        console.log('price =', this.seats);
        this.numberOfSeats = this.booking.seats.length;
        this.bookingsService.fillUserData(this.booking.customerId, this.booking.providerId);
        this.loading = false;
        this.disabled = false;
        this.date = this.booking.date;
        // console.log('booking = ',this.booking);
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
  async edit() {
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
            let id = this.booking.id;
            this.updateServiceProviderRoute(this.booking.providerId, this.booking);
          }
        }
      ]
    });
    await alert.present();

    ///   this.deletBooking(id);
    // this.bookingsService.saveBookingForEdit(this.booking[index]);
    // this.router.navigateByUrl('customer-profile/booking-edit');
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      // message: `${name} has been saved successfully.`,
      duration: 3500
    });
    toast.present();
  }
  async updateServiceProviderRoute(id, booking) {
    const observable = await this.serviceProviderServices.editRouteOfServiceProvider(id, booking);
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        this.presentToast(data.message);
        //this.loading = false;
        const observable = await this.bookingsService.deleteBooking(this.booking.id);
        observable.subscribe(
          data => {
            console.log('response =', data);

            this.presentToast(data.message);
            this.router.navigateByUrl('/customer-dashboard');

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
}
