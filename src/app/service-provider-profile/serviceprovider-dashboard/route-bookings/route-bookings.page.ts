import { Component, OnInit } from '@angular/core';
import { BookingsService, Booking } from 'src/app/sdk/custom/bookings.service';
import { ServiceProvidersService, Routes } from 'src/app/sdk/custom/service-providers.service';
import { Router } from '@angular/router';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
var ObjectId = require("mongoose").Types.ObjectId;
@Component({
  selector: 'app-route-bookings',
  templateUrl: './route-bookings.page.html',
  styleUrls: ['./route-bookings.page.scss'],
})
export class RouteBookingsPage implements OnInit {
  booking: Booking[];
  customerName;
  numberOfSeats;
  price;
  seats: string[];
  loading = true;
  skeletonlist = [1, 2, 3, 4, 5];
  expireBookingLoading = false;
  route:Routes;
  constructor(private menu: MenuController, public toastController: ToastController, public alertController: AlertController, private router: Router, private bookingsService: BookingsService, private serviceProviderServices: ServiceProvidersService) { }
  async refreshPage(event) { 
    this.loading = true;
    this.getBookings();
    setTimeout(() => {
      this.loading = false;
      event.target.complete();
    }, 1000);
  }
  async ngOnInit() {
     this.route = await this.bookingsService.getBookingroute();
     console.log('route= ',this.route);
    this.getBookings();
  }
  edit() { }
  async getBookings() {
    let id = await this.serviceProviderServices.getRouteId();
    const observable = await this.bookingsService.getRouteBookings(id);
    observable.subscribe(
      data => {

        this.booking = data.data;
        //console.log('object = ',data);
        console.log('booking = ', this.booking);

        //checking if the  booking is manualy booked
        for (let i = 0; i < this.booking.length; i++) {
          // If value is an object (ObjectId) cast it to a string
          var valueString = typeof this.booking[i].customerId === "string" ? this.booking[i].customerId : String(this.booking[i].customerId);
          if (valueString.length !== 24) {
            this.booking[i].customerId = 'manual';
          }
          else {
            var idInstance = new ObjectId(valueString);
            //if it is mongodb id than it will not change after casting 
            if (String(idInstance) === valueString) {
              console.log('mongoDb id', this.booking[i]);
            }
            else {
              this.booking[i].customerId = 'manual';
            }
          }
        }
        this.loading = false;


      },
      err => {
        console.log('err', err);
      },

    );
  }
  goToBookingDetails(booking) {
    //console.log('booking = ',booking);
    this.bookingsService.saveCustomerIdForServiceProvider(booking.customerId)
    //this.bookingsService.putBookingCustomer(booking.customerId);
    this.bookingsService.putBookedSeats(booking.seats);
    this.router.navigateByUrl('service-provider-profile/serviceprovider-dashboard/route-bookings/booking-details');
  }
  goToManualBooking() {
    this.router.navigateByUrl('service-provider-profile/serviceprovider-dashboard/route-bookings/manual-booking');
  }
  async expireBooking(booking,i) {
    console.log('fucntion')
    
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Are you sure to expire this booking!!!',
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
                          this.expireBookingLoading = true;
            this.bookingsService.expireBooking(booking.id);
            const observable = await this.bookingsService.expireBooking(booking.id);
            observable.subscribe(
              async data => {
                //   this.completed = true;
                this.expireBookingLoading = false;
                //this.booking[i].expire = true;
                this.booking.splice(i,1);
                console.log('data too =', data);
                const toast = await this.toastController.create({
                  message: data.message,
                 // message: `${name} has been saved successfully.`,
                  duration: 3500
                });
                toast.present();

              },
              async err => {
                const toast = await this.toastController.create({
                  message: err.error.message,
                 // message: `${name} has been saved successfully.`,
                  duration: 3500
                });
                toast.present();
              });
            }
          }
        ]
      });
  
      await alert.present();
    
    // const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Confirm!',
    //   message: 'Are you sure to expire this booking!!!',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //       }
    //     }, {
    //       text: 'Okay',
    //       handler: async () => {
    //         this.expireBookingLoading = true;
    //         this.bookingsService.expireBooking(booking.id);
    //         const observable = await this.bookingsService.expireBooking(booking.id);
    //         observable.subscribe(
    //           async data => {
    //             //   this.completed = true;
    //             this.expireBookingLoading = false;
    //             this.booking[i].expire = true;
    //             console.log('data too =', data);
    //             const toast = await this.toastController.create({
    //               message: data.message,
    //              // message: `${name} has been saved successfully.`,
    //               duration: 3500
    //             });
    //             toast.present();

    //           },
    //           async err => {
    //             const toast = await this.toastController.create({
    //               message: err.error.message,
    //              // message: `${name} has been saved successfully.`,
    //               duration: 3500
    //             });
    //             toast.present();
    //           });
    //       }
    //     }
    //   ]
    // });

  }
}
