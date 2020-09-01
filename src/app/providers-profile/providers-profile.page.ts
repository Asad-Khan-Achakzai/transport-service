import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProvidersService, Routes } from '../sdk/custom/service-providers.service';
import {serviceProvider} from '../customer-dashboard/service-provider.model';
import { IonSlides, MenuController, ToastController, AlertController } from '@ionic/angular';
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
  serviceProviderID;
  ranking:number;
   rank;
@ViewChild('slides', { static: true }) slider: IonSlides;  
  constructor(public alertCtrl: AlertController,public toastController: ToastController,private menu: MenuController,private chatService: ChatServiceService,private socket: SocketIo,private customerService:CustomersService,private activatedRoute: ActivatedRoute, private router: Router,private serviceProvidersService: ServiceProvidersService) {
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
    setTimeout(() => {
     this.showRanking();
    }, 10000);
    let id = await this.customerService.getproviderIdForProviderProfile();
    this.serviceProviderID = id;
    this.getServiceProvider(id);
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
        this.ranking = this.serviceProviderInfo.rank;
      this.rank = this.ranking.toFixed(1);
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
  async goToBooking(route){
    if(route.paused){
      const toast = await this.toastController.create({
        message: 'This route is not operational contact owner',
       // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
    else{
      this.customerService.saveProviderBookingData(route.id,this.providerID,route.timing,route.bookedSeats,route.totalSeats,route.priceperSeat)
      //this.customerService.saveProviderRoute(route);
      console.log('route id = ',route.id);
  
      this.router.navigateByUrl('/providers-profile/seat-booking');
    }
    
  }
  async showRanking(){
    const alert = this.alertCtrl.create({
      header: 'Feedback',
      
      cssClass: 'alertstar',
      
      buttons: [
           { text: '1', handler: data => { this.resolveRec(1.0);}},
           { text: '2', handler: data => { this.resolveRec(2.0);}},
           { text: '3', handler: data => { this.resolveRec(3.0);}},
           { text: '4', handler: data => { this.resolveRec(4.0);}},
           { text: '5', handler: data => { this.resolveRec(5.0);}}
      ]
 });
 (await alert).present();
  }
  async resolveRec(i){
console.log('ranking = ',i );


(await this.serviceProvidersService.updateRanking({id:this.serviceProviderID,ranking:i})).subscribe(
  async data => {
    if(data.message === 'Task completed successfully'){
      const toast = await this.toastController.create({
        message: 'Response saved',
      // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
    else{
      const toast = await this.toastController.create({
        message: 'Response not saved',
      // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
   
    console.log('response',data);
  });
  }
}
