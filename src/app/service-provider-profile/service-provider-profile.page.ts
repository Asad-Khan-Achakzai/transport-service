import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomerService } from 'src/sdk/custom/customer.service';
import { ServiceProvidersService, Routes } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
import { IonSlides, NavController } from '@ionic/angular';
import { SocketIo } from 'ng-io';
import { ChatServiceService } from '../chat-room/chat-service.service';
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
  companyName: string;
  officeLocation: string;
  section: string = 'two';
  somethings: any = new Array(20);
  cities = [];
  routes = [];
  routesArr: Routes[];
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  
  constructor(private chatService:ChatServiceService,private socket: SocketIo,public navCtrl: NavController,private router :Router,private serviceProvidersService: ServiceProvidersService) {
    this.routesArr = [new Routes];
   }

  ngOnInit() {
    this.chatService.serviceProviderLogedIn();
   // this.serviceProvidersService.getSingleServiceProvider();
    this.getServiceProvider();
    //send username to inbox
  }
  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
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
        this.serviceProvidersService.serviceProviderNameForInbox(this.userName );
        this.phone = this.serviceProviderInfo.phone;
        this.cnic = this.serviceProviderInfo.cnic;
        this.cities = this.serviceProviderInfo.citiesArray;
        this.routes = this.serviceProviderInfo.servicesArray;
        this.companyName = this.serviceProviderInfo.companyName;
        this.officeLocation = this.serviceProviderInfo.officeLocation;
        this.routesArr = this.serviceProviderInfo.servicesArray;
        console.log(this.cities);
      },
      err => {
        console.log('err', err);
      }
    );
  }
  delete(id: number): void{
    this.routes.splice(id, 1);  
  }
  remove(i){
    console.log('delet',i)
  }
  openChatRoom(){
    this.socket.connect();
    this.socket.emit('set-nickname',this.userName);
    //this.socket.emit('set-reciever', this.userName);
    
    this.socket.emit('set-type','serviceProvider');
    this.router.navigateByUrl('service-provider-profile/inbox');
  } 
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