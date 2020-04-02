import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomerService } from 'src/sdk/custom/customer.service';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
@Component({
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.page.html',
  styleUrls: ['./service-provider-profile.page.scss'],
})
export class ServiceProviderProfilePage implements OnInit {
  serviceProviderInfo:serviceProvider;
  email:string;
  userName: string;
  phone: string;
  cnic:string;
  cities = [];
  routes = [];
  
  constructor(private router :Router,private serviceProvidersService: ServiceProvidersService) { }

  ngOnInit() {
   // this.serviceProvidersService.getSingleServiceProvider();
    this.getServiceProvider();
  }
  back(){
    this.router.navigateByUrl('/home');
  }
  // async  getServiceProvider(){
  //       this.serviceProviderInfo = this.serviceProvidersService.getLogedInServiceProvider();
  //       this.email = this.serviceProviderInfo.email;
  //       this.userName = this.serviceProviderInfo.username;
  //       this.phone = this.serviceProviderInfo.phone;
  //       this.cnic = this.serviceProviderInfo.cnic;
  //       this.cities = this.serviceProviderInfo.citiesArray;
  //       this.routes = this.serviceProviderInfo.servicesArray;
  // }
  async  getServiceProvider(){
    const observable = await this.serviceProvidersService.getServiceProvider();
    observable.subscribe(
      data => {
        this.serviceProviderInfo = data.data;
        this.email = this.serviceProviderInfo.email;
        this.userName = this.serviceProviderInfo.username;
        this.phone = this.serviceProviderInfo.phone;
        this.cnic = this.serviceProviderInfo.cnic;
        this.cities = this.serviceProviderInfo.citiesArray;
        this.routes = this.serviceProviderInfo.servicesArray;
        console.log('tags array',this.cities);
        
        console.log('routes', this.routes);
      },
      err => {
        console.log('err', err);
      }
    );
  }
  delete(id: number): void{
    this.routes.splice(id, 1);  }
 
}
// interface serviceProvider {
//   username: string;
//   email: string;
//   password: string;
//   is_deleted: boolean;
//   phone: string;
//   cnic: string;
//   citiesArray: string[];
//   servicesArray: string[];
//   companyName: string;
//   officeLocation: string;
// }