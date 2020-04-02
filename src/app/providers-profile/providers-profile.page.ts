import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';

@Component({
  selector: 'app-providers-profile',
  templateUrl: './providers-profile.page.html',
  styleUrls: ['./providers-profile.page.scss'],
})
export class ProvidersProfilePage implements OnInit {
provider:serviceProvider;
email:string;
userName: string;
phone: string;
cnic:string;
  constructor(private activatedRoute: ActivatedRoute,private serviceProvidersService: ServiceProvidersService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('providerID')){
        return;
      }
      const providerID =  paramMap.get('providerID');
      this.provider = this.serviceProvidersService.getSingleProvider(providerID);
      //console.log("from profile",this.provider);
      this.email = this.provider.email;
      this.userName = this.provider.username;
      this.phone = this.provider.phone;
      this.cnic = this.provider.cnic
    });
  }

}
