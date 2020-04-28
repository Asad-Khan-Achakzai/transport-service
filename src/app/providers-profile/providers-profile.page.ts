import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProvidersService, Routes } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
import { IonSlides } from '@ionic/angular';
import { CustomersService } from '../sdk/custom/customers.service';
import { SocketIo } from 'ng-io';
import { ChatServiceService } from '../chat-room/chat-service.service';

@Component({
  selector: 'app-providers-profile',
  templateUrl: './providers-profile.page.html',
  styleUrls: ['./providers-profile.page.scss'],
})
export class ProvidersProfilePage implements OnInit {
  serviceProviderInfo:serviceProvider;
  email:string;
  userName: string;
  phone: string;
  cnic:string;
  companyName: string;
  officeLocation: string;
  section: string = 'two';
  somethings: any = new Array(20);
  cities = [];
  routes = [];
  routesArr: Routes[];
  segment = 0;  
@ViewChild('slides', { static: true }) slider: IonSlides;  
  constructor(private chatService: ChatServiceService,private socket: SocketIo,private customerService:CustomersService,private activatedRoute: ActivatedRoute, private router: Router,private serviceProvidersService: ServiceProvidersService) {
    this.routesArr = [new Routes];
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('providerID')){
        return;
      }
      const providerID =  paramMap.get('providerID');
      this.serviceProviderInfo = this.serviceProvidersService.getSingleProvider(providerID);
      //console.log("from profile",this.provider);
      this.email = this.serviceProviderInfo.email;
      this.userName = this.serviceProviderInfo.username;
      this.phone = this.serviceProviderInfo.phone;
      this.cnic = this.serviceProviderInfo.cnic;
      this.cities = this.serviceProviderInfo.citiesArray;
      this.routes = this.serviceProviderInfo.servicesArray;
      this.companyName = this.serviceProviderInfo.companyName;
      this.officeLocation = this.serviceProviderInfo.officeLocation;
      this.routesArr = this.serviceProviderInfo.servicesArray;
      this.email = this.serviceProviderInfo.email;
      this.userName = this.serviceProviderInfo.username;
      this.phone = this.serviceProviderInfo.phone;
      this.cnic = this.serviceProviderInfo.cnic
    });
  }
  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  }
  delete(id: number): void{
    this.routes.splice(id, 1);  
  }
  remove(i){
    console.log('delet',i)
  }
  openChatRoom(){
    //this.socket.connect();
    this.chatService.setproviderName(this.userName);
    this.chatService.setCustomerFrom('fromProvidersProfile');
    // this.socket.emit('set-nickname',this.customerService.customerName);
    // this.socket.emit('set-reciever', this.userName);
    // console.log(this.userName);
    // this.socket.emit('set-type','customer');
    this.router.navigateByUrl('/chat-room');
  }
}
