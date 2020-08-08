import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProvidersService, Routes } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
import { IonSlides, MenuController } from '@ionic/angular';
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
  providerID;
  image:string;
  loading =true;
  skeletonlist = [1,2,3,4,5];
@ViewChild('slides', { static: true }) slider: IonSlides;  
  constructor(private menu: MenuController,private chatService: ChatServiceService,private socket: SocketIo,private customerService:CustomersService,private activatedRoute: ActivatedRoute, private router: Router,private serviceProvidersService: ServiceProvidersService) {
    this.routesArr = [new Routes];
   }
   async refreshPage(event) { 
    
    this.loading = true;
    let id = await this.customerService.getproviderIdForProviderProfile();
    this.getServiceProvider(id);
   // if(this.completed){
   //   this.loading = false;
   //   event.target.complete();
   //   this.completed = false;
   // }
   setTimeout(() => {
     console.log('Async operation has ended');
     event.target.complete();
   }, 1000);
  }
  async ngOnInit() {
  
    let id = await this.customerService.getproviderIdForProviderProfile();
    this.getServiceProvider(id);

    // this.activatedRoute.paramMap.subscribe(paramMap =>{
    //   if(!paramMap.has('providerID')){
    //     return;
    //   }
      
    //   this.providerID =  paramMap.get('providerID');
    //   this.serviceProviderInfo = this.serviceProvidersService.getSingleProvider(this.providerID);
    //   //console.log("from profile",this.provider);
    //   console.log('object = ',this.serviceProviderInfo)
    //   this.email = this.serviceProviderInfo.email;
    //   this.userName = this.serviceProviderInfo.username;
    //   this.phone = this.serviceProviderInfo.phone;
    //   this.cnic = this.serviceProviderInfo.cnic;
    //   this.cities = this.serviceProviderInfo.citiesArray;
    //   this.routes = this.serviceProviderInfo.servicesArray;
    //   this.companyName = this.serviceProviderInfo.companyName;
    //   this.officeLocation = this.serviceProviderInfo.officeLocation;
    //   this.routesArr = this.serviceProviderInfo.servicesArray;
    //   this.email = this.serviceProviderInfo.email;
    //   this.userName = this.serviceProviderInfo.username;
    //   this.phone = this.serviceProviderInfo.phone;
    //   this.cnic = this.serviceProviderInfo.cnic
    //   this.image = this.serviceProviderInfo.imageUrl;
    // });
  }

  async ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    let id = await this.customerService.getproviderIdForProviderProfile();
    this.getServiceProvider(id);
  }
  async  getServiceProvider(id){
    const observable = await this.serviceProvidersService.getServiceProvider(id);
    observable.subscribe(
      data => {
        this.loading = false;
        console.log('data too =',data);
        this.serviceProvidersService.serviceProviderPass= data.pass;
        this.serviceProviderInfo = data.data;
        this.providerID = this.serviceProviderInfo._id;
       // console.log('data tosdo =',this.serviceProviderInfo);
        this.email = this.serviceProviderInfo.email;
        this.userName = this.serviceProviderInfo.username;
        console.log('userName = ',this.userName);
      //    this.id = this.serviceProviderInfo._id;
      //    this.serviceProvidersService.saveServiceProviderImg(this.serviceProviderInfo.imageUrl);
      //   // this.serviceProvidersService.setServiceProviderIdForInbox(this.serviceProviderInfo._id);
      //   this.serviceProvidersService.saveServiceProviderName(this.userName);
      //  // this.serviceProvidersService.serviceProviderNameForInbox(this.userName );
      //   this.serviceProvidersService.serviceProviderImage_url = this.serviceProviderInfo.imageUrl;
        this.phone = this.serviceProviderInfo.phone;
        this.cnic = this.serviceProviderInfo.cnic;
        this.cities = this.serviceProviderInfo.citiesArray;
        this.routes = this.serviceProviderInfo.servicesArray;
        this.companyName = this.serviceProviderInfo.companyName;
        this.officeLocation = this.serviceProviderInfo.officeLocation;
        this.routesArr = this.serviceProviderInfo.servicesArray;
        this.image = this.serviceProviderInfo.imageUrl;
      },
      err => {
        console.log('err', err);
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
    console.log('id in ',this.providerID);
    this.chatService.setproviderName(this.userName,this.providerID,this.image);
    //console.log('image in provider profile = ',this.image);

    this.chatService.setCustomerFrom('fromProvidersProfile');
    // this.socket.emit('set-nickname',this.customerService.customerName);
    // this.socket.emit('set-reciever', this.userName);
    // console.log(this.userName);
    // this.socket.emit('set-type','customer');
    this.router.navigateByUrl('/chat-room');
  }
  goToBooking(route){
    this.customerService.saveProviderBookingData(route.id,this.providerID,route.timing,route.bookedSeats,route.totalSeats,route.priceperSeat)
    //this.customerService.saveProviderRoute(route);
    console.log('route id = ',route.id);

    this.router.navigateByUrl('/providers-profile/seat-booking');
  }
}
