import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';

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
  isChecked10e;
  isChecked10f;
  isChecked10g;

  bookedSeats:string[]= [];;
  price = 0;
  routeId:string;
  providerId:string;
  routeTiming:string;
  customerId:string;
  constructor(private customerService:CustomersService,private bookingsService:BookingsService) { }

  ngOnInit() {
    this.loadIds();
  }
  loadIds(){
    this.routeId = this.customerService.routeIdOfRoute;
    this.providerId = this.customerService.prividerIdOfRoute;
    this.routeTiming = this.customerService.routeTiming;
    this.customerId = this.customerService.logedInCustomerId;
    console.log('routeId  =',this.routeId);
    console.log('providerId =',this.providerId);
    console.log('customerID = ',this.customerId)
    console.log('timing =',this.routeTiming);
  }
  checkValue(condition,value){

    console.log('value = ',value,'condition = ',condition)
    if(condition===true)
    {this.price = this.price+300;
      console.log('price = ',this.price)
      this.bookedSeats.push(value);
      
    }
    if(condition===false)
    { 
      let index = this.bookedSeats.indexOf(value);
      console.log(index);
      this.bookedSeats.splice(index,1);
      this.price =this.price-300;
    }
    console.log('array = ',this.bookedSeats);
  }
  saveData(){
    this.bookingsService.bookingRegister({price:this.price,seats:this.bookedSeats,routId:this.routeId,customerId:this.customerId,providerId:this.providerId,timing:this.routeTiming}).subscribe(
      data => {
        console.log('got response from server', data);
   
       // this.router.navigateByUrl('/home');
      },
      error => {
      
        console.log('error', error);
      }
    );
   }
}
