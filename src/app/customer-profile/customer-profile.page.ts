import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../sdk/custom/customers.service';
import { Router } from '@angular/router';
import { AuthService } from '../sdk/core/auth.service';
import { ChatServiceService } from '../chat-room/chat-service.service';
import { SocketIo } from 'ng-io';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { MixedService } from '../sdk/custom/mixed.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {
  costomerInfo: customer;
  email: string;
  userName: string;
  phone: string;
  cnic: string;
  id: string;
  chats;
  image:string;
chatt:chat[];
unreadMessages:chat[];
countArr;
observableCompleted = false;
msgs:number;
  constructor(private mixedService:MixedService,private menu: MenuController,private socket: SocketIo,private chatService:ChatServiceService,private authService: AuthService, private router: Router, private customerService: CustomersService) {
    this.getNewMessage().subscribe(message => {
      if (this.customerService.logedInCustomerId === message['recieverId'] || this.customerService.logedInCustomerId === message['senderId']) {
        this.chats.push(message);
        this.filterArray(this.chats);
      }

    });
   }
   
   
   getNewMessage() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('messages recieved = ',data);
        observer.next(data);
      });
    })
    return observable;
  }
  async ngOnInit() {
  this.mixedService.user = 'customer';
    this.chatService.customerLogedIn();
    
    this.diplayToken();
    await this.getCustomer(),() => {
      this.getMessages().subscribe(message => {
        this.chats = message;
        console.log('inbox data = ',message)
        this.filterArray(this.chats);
       });
    }
    if(this.observableCompleted){
     }
  }
  ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    this.getCustomer();
    
  }
  public async diplayToken(): Promise<any> {
    const token = await this.authService.getTokenFromStorage();
    console.log('token :', token);
  }
  goToDashboard() {
    this.router.navigateByUrl('/customer-dashboard');
  }
  back() {
    this.router.navigateByUrl('/home');
  }
  logout() {
    this.authService.logout();
  }
  openChatRoom(){
    this.socket.connect();
    //this.socket.emit('set-nickname',this.userName);
    //this.socket.emit('set-reciever', this.userName);
    
    //this.socket.emit('set-type','serviceProvider');
    this.router.navigateByUrl('customer-profile/inbox');
  }
  
  openBookingCart(){
    this.router.navigateByUrl('customer-profile/booking-cart')
  }
  async  getCustomer() {
    const observable = await this.customerService.getCustomer();
    observable.subscribe(
      data => {
       // console.log('data =',data);
        console.log('password = ',data.pass);
        this.costomerInfo = data.data;
       //saving imageurl to storage
       this.customerService.saveCustomerImg(this.costomerInfo.imageUrl);

       this.customerService.customerPassword = data.pass;
        this.id = this.costomerInfo._id;
        this.email = this.costomerInfo.email;
        this.userName = this.costomerInfo.username;
        this.phone = this.costomerInfo.phone;
        this.cnic = this.costomerInfo.cnic;
        this.image = this.costomerInfo.imageUrl;
        this.customerService.customerName = this.costomerInfo.username;
        this.customerService.saveCustomerName(this.costomerInfo.username);
        this.customerService.logedInCustomerId = this.costomerInfo._id;
        this.customerService.logedInCustomerImage_url = this.costomerInfo.imageUrl;
        this.customerService.customerData = this.costomerInfo;
        this.customerService.publishSomeData({
          customerImg: this.image
        })
        //console.log('data', data.data);
      },
      err => {
        console.log('err', err);
      }
    //   () => {console.log('#1 Complete')
    //   this.customerService.saveCustomerImg(this.costomerInfo.imageUrl);
    //   this.getMessages().subscribe(message => {
    //     this.chats = message;
    //     console.log('called = ',message)
    //     this.filterArray(this.chats);
    //    });
    // this.observableCompleted = true;
    // }
     );
  }
  getMessages() {
    this.socket.emit('set-recieverForCustomerInbox', this.id);
    // Handle Output
   let observable = new Observable(observer => {
    this.socket.on('customerInboxData', (data) => {
      observer.next(data);
    });
   })
   
   return observable;
   }
   //filtering array to have each sender only once;
filterArray(chats){
  this.chatt = chats.slice();
 
  this.unreadMessages = this.chatt.filter(item => item.status == 'unread');
  this.msgs = this.unreadMessages.length;
  console.log('unread messages = ',this.unreadMessages.length);
 }

}
interface customer {
  
  _id: string;
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
  imageUrl:string;
  
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