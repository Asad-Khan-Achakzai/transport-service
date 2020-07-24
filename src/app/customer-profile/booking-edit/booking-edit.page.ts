import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { BookingsService, Booking } from 'src/app/sdk/custom/bookings.service';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { Router } from '@angular/router';
import { serviceProvider } from 'src/app/customer-dashboard/service-provider.model';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.page.html',
  styleUrls: ['./booking-edit.page.scss'],
})
export class BookingEditPage implements OnInit {

 
  constructor(private menu: MenuController,public toastController: ToastController,public alertController: AlertController, private customerService: CustomersService, private bookingsService: BookingsService, private serviceProviderServices: ServiceProvidersService, private router: Router) { }

  async ngOnInit() {
   

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
