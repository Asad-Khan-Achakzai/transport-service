import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomerService } from 'src/sdk/custom/customer.service';
import { ServiceProvidersService, Routes } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
import { IonSlides, NavController, MenuController } from '@ionic/angular';
import { SocketIo } from 'ng-io';
import { ChatServiceService } from '../chat-room/chat-service.service';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../sdk/core/auth.service';
@Component({
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.page.html',
  styleUrls: ['./service-provider-profile.page.scss'],
})
export class ServiceProviderProfilePage implements OnInit {
  serviceProviderInfo:serviceProvider;
  email:string;
  id: string;
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
  chatData;
  image:string;
chats;
chatt:chat[];
unreadMessages:chat[];
countArr;
observableCompleted = false;
msgs:number;
completed = false;
loading = true;
skeletonlist = [1,2,3,4,5];
ranking:number;
   rank;
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  
  constructor(private menu: MenuController,private chatService:ChatServiceService,private socket: SocketIo,public navCtrl: NavController,private router :Router,private serviceProvidersService: ServiceProvidersService,private authService: AuthService) {
    this.routesArr = [new Routes];
    this.getNewMessage().subscribe(message => {
      if (this.serviceProvidersService.serviceProviderIdInbox === message['recieverId'] ) {
        this.chats.push(message);
        this.filterArray(this.chats);
      }

    });
   }
   async getUsersList(event) { 
    this.loading = true;
    console.log('Pull Event Triggered!');  
    let id = await this.serviceProvidersService.getServiceProviderId();
    this.getServiceProvider(id);
    if(this.completed){
      this.loading = false;
      event.target.complete();
    }
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 2000);
   } 
   getNewMessage() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  async ngOnInit() {
    this.chatService.serviceProviderLogedIn();
   // this.serviceProvidersService.getSingleServiceProvider();
   let id = await this.serviceProvidersService.getServiceProviderId();
    this.getServiceProvider(id);
    //send username to inbox
    if(this.observableCompleted){
    this.getMessages().subscribe(message => {
      this.chats = message;
      console.log('inbox data = ',message)
      this.filterArray(this.chats);
     });}
     

  }
  async ionViewDidEnter() {
    this.menu.enable(true)
    this.chatService.serviceProviderLogedIn();
    this.menu.enable(false, 'first');
    this.menu.enable(true, 'custom');
    this.menu.enable(false, 'end');
    let id = await this.serviceProvidersService.getServiceProviderId();
    this.getServiceProvider(id);
    
  }
  getMessages() {
    this.socket.emit('set-recieverForInbox', this.id);
    // Handle Output
   let observable = new Observable(observer => {
    this.socket.on('inboxData', (data) => {
      observer.next(data);
    });
   })
   
   return observable;
   }
   //filtering array to have each sender only once;
filterArray(chats){
  this.chatt = chats.slice();
 console.log('this.chatt =',this.chatt);
  this.unreadMessages = this.chatt.filter(item => item.status == 'unread');
  this.msgs = this.unreadMessages.length;
  console.log('unread messages = ',this.unreadMessages.length);
 }
  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  }  
  goToDashboard() {
    this.router.navigateByUrl('service-provider-profile/serviceprovider-dashboard');
  }
  logout() {
    this.authService.logout();
    
  }
  back(){
    this.router.navigateByUrl('/home');
  }

  async  getServiceProvider(id){
    const observable = await this.serviceProvidersService.getServiceProvider(id);
    observable.subscribe(
      data => {
        this.loading = false;
        this.completed = true;
        console.log('data too =',data);
        this.serviceProvidersService.serviceProviderPass= data.pass;
        this.serviceProviderInfo = data.data;
        console.log(' this.serviceProviderInfo =', this.serviceProviderInfo);
        this.email = this.serviceProviderInfo.email;
        this.userName = this.serviceProviderInfo.username;
        console.log('userName = ',this.userName);
         this.id = this.serviceProviderInfo._id;
         this.serviceProvidersService.saveServiceProviderImg(this.serviceProviderInfo.imageUrl);
        // this.serviceProvidersService.setServiceProviderIdForInbox(this.serviceProviderInfo._id);
        this.serviceProvidersService.saveServiceProviderName(this.userName);
       // this.serviceProvidersService.serviceProviderNameForInbox(this.userName );
        this.serviceProvidersService.serviceProviderImage_url = this.serviceProviderInfo.imageUrl;
        this.phone = this.serviceProviderInfo.phone;
        this.cnic = this.serviceProviderInfo.cnic;
        this.cities = this.serviceProviderInfo.citiesArray;
        this.routes = this.serviceProviderInfo.servicesArray;
        this.companyName = this.serviceProviderInfo.companyName;
        this.officeLocation = this.serviceProviderInfo.officeLocation;
        this.routesArr = this.serviceProviderInfo.servicesArray;
        this.image = this.serviceProviderInfo.imageUrl;
        this.ranking = this.serviceProviderInfo.rank;
        this.rank = this.ranking.toFixed(1);
        this.serviceProvidersService.publishSomeData({
          serviceProviderImage: this.image
        })
      },
      err => {
        console.log('err', err);
      },
      async () => {console.log('#1 Complete')
      console.log('image =',await this.serviceProvidersService.getServiceProviderImg())
      this.serviceProvidersService.putServiceProviderDat(this.serviceProviderInfo);
      this.getMessages().subscribe(message => {
        this.chats = message;
        console.log('inbox data = ',message)
        this.filterArray(this.chats);
       });
    this.observableCompleted = true;
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
interface chat{
  msgId:string,
  senderId:String,
  name: String,
  recieverId:String,
  reciever: String,
  msg: String,
  status: String,
  created:Time
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