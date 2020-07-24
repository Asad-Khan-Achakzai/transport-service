import { Component, OnInit } from '@angular/core';
import { ServiceProvidersService, Routes } from 'src/app/sdk/custom/service-providers.service';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
route:Routes;
email: string;
  userName: string;
  phone: string;
  cnic: string;
  id: string;
  chats;
  image:string;
  constructor(private serviceProvidersService: ServiceProvidersService,private bookingsService:BookingsService) { }
  costomerInfo:customer;
bookedSeats:Array<string>;

  ngOnInit() {
    this.getDetails();
    //this.getSeats();
  }
  async getDetails(){
    let id = await this.bookingsService.getCustomerIdForServiceProvider();
    const observable = await this.bookingsService.getBookingCustomer(id);
    observable.subscribe(
      data => {
        this.costomerInfo = data.data;
        //console.log('object = ',data);
        console.log('customer = ',this.costomerInfo);
        this.id = this.costomerInfo._id;
        this.email = this.costomerInfo.email;
        this.userName = this.costomerInfo.username;
        this.phone = this.costomerInfo.phone;
        this.cnic = this.costomerInfo.cnic;
        this.image = this.costomerInfo.imageUrl;
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
  getSeats(){
    this.bookedSeats = this.bookingsService.bookedSeats;
    console.log('booked seats = ',this.bookedSeats);
  }
  // getRoute(){
  //   this.route = this.serviceProvidersService.routeForManualBooking;
  //   console.log('route = ',this.route);
  // }

}
interface customer {
  
  _id: string;
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
  imageUrl:string;
  
}