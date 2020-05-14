import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { serviceProvider } from './service-provider.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.page.html',
  styleUrls: ['./customer-dashboard.page.scss'],
})
export class CustomerDashboardPage implements OnInit {
   
  constructor(private serviceProvidersService: ServiceProvidersService) {
  }

  ngOnInit() {
 
  }

}