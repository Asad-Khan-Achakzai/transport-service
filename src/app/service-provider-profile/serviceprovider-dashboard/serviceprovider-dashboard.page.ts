import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProvidersService, Routes } from 'src/app/sdk/custom/service-providers.service';
import { serviceProvider } from 'src/app/customer-dashboard/service-provider.model';
import { BookingsService } from 'src/app/sdk/custom/bookings.service';

@Component({
  selector: 'app-serviceprovider-dashboard',
  templateUrl: './serviceprovider-dashboard.page.html',
  styleUrls: ['./serviceprovider-dashboard.page.scss'],
})
export class ServiceproviderDashboardPage implements OnInit {
  routesArr:Array<Routes>;
  serviceProvider:serviceProvider;
  loading = false;
  skeletonlist = [1, 2, 3, 4, 5];

  constructor(private bookingsService:BookingsService,private router :Router,private serviceProvidersService: ServiceProvidersService) { }

  async ngOnInit() {
    let id = await this.serviceProvidersService.getServiceProviderId();
    this.getServiceProvider(id);
  }
  async refreshPage(event) { 
    this.loading = true;
    let id = await this.serviceProvidersService.getServiceProviderId();
    this.getServiceProvider(id);
    setTimeout(() => {
      this.loading = false;
      event.target.complete();
    }, 1000);
  }
  // getServiceProvider(){
  //   this.serviceProvider = this.serviceProvidersService.serviceProviderData;
  //   this.routesArr = this.serviceProvider.servicesArray;
  // }
  async  getServiceProvider(id){
    this.loading = true;
    const observable = await this.serviceProvidersService.getServiceProvider(id);
    observable.subscribe(
      data => {
     //   this.completed = true;
     this.loading = false;
        console.log('data too =',data);
        this.serviceProvider = data.data;
        this.routesArr = this.serviceProvider.servicesArray;
      },
      err => {
        console.log('err', err);
      });
    }
  goToBooking(route){
    this.bookingsService.saveBookingroute(route);
    this.serviceProvidersService.saveRoutId(route.id);
//this.serviceProvidersService.putRoutId(route.id);
this.serviceProvidersService.putrouteForManualBooking(route);
//console.log('routeId = ',route);
this.router.navigateByUrl('service-provider-profile/serviceprovider-dashboard/route-bookings');
  }
 
}
