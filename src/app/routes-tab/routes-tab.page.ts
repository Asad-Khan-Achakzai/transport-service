import { Component, OnInit } from '@angular/core';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';

@Component({
  selector: 'app-routes-tab',
  templateUrl: './routes-tab.page.html',
  styleUrls: ['./routes-tab.page.scss'],
})
export class RoutesTabPage implements OnInit {
  serviceProviderInfo:serviceProvider;
  email:string;
  userName: string;
  phone: string;
  cnic:string;
  cities = [];
  routes = [];
  constructor(private serviceProvidersService: ServiceProvidersService) { }

  ngOnInit() {
    this.getServiceProvider();
  }
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
}
interface serviceProvider {
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
  citiesArray: string[];
  servicesArray: string[];
  companyName: string;
  officeLocation: string;
}