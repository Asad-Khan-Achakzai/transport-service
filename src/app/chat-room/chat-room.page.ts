import { Component, OnInit, Inject } from '@angular/core';
import { NavParams, ToastController, NavController } from '@ionic/angular';
import { SocketIo } from 'ng-io';
import { Observable } from 'rxjs';
import { CustomersService } from '../sdk/custom/customers.service';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { ChatServiceService } from './chat-service.service';
import { Time } from '@angular/common';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

chat;
 chatData: Array<String>;
  messages = [];
  nickname = '';
  message = '';
  sender;
  reciever;
  private navParams = new NavParams
  constructor(private chatService: ChatServiceService, private serviceProvidersService: ServiceProvidersService, private customerService: CustomersService, private navCtrl: NavController, private socket: SocketIo, private toastCtrl: ToastController) {
    //this function will always listen for the latest message 
    console.log('constructor called');

    if (this.chatService.user === 'customer'){
      this.getNewMessage().subscribe(message => {
        if(this.customerService.customerName===message['reciever']||this.customerService.customerName===message['name']){
          this.messages.push(message);
        }
  
      });
    }
    else if (this.chatService.user === 'serviceProvider'){
      this.getNewMessage().subscribe(message => {
        if(this.serviceProvidersService.getServiceProviderName()===message['reciever']||this.serviceProvidersService.getServiceProviderName()===message['name']){
          this.messages.push(message);
        }
  
      });
    }
    else
      console.log('no user loggedin in chat room');


    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }
  ngOnInit() {
    if (this.chatService.user === 'customer'){
      console.log('customer in chat room');
      if(this.chatService.customerFrom==='fromProfile')
      {
        this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
      }
      else{
        this.chatData = [this.customerService.customerName,this.chatService.providerName];
      }

      this.chatService.emitEvent(this.chatData);
      this.nickname = this.customerService.customerName;
      this.chatService.getMessages().subscribe(message => {
        this.chat = message;
         console.log('chatData = ',this.chat);
         //this.messages.push(message);
         this.messages = this.chat;
         console.log('messages = ',this.messages);
       });
    }
    else if (this.chatService.user === 'serviceProvider'){
      console.log('service provder in chat room');
      this.chatData = [this.serviceProvidersService.getServiceProviderName(),this.chatService.senderOfServiceProvider];
      this.reciever = this.serviceProvidersService.getServiceProviderName();
      this.sender = this.chatService.senderOfServiceProvider;
       this.chatService.emitEvent(this.chatData);
     this.nickname = this.serviceProvidersService.getServiceProviderName();
    
      this.chatService.getMessages().subscribe(message => {
        console.log('data returned by the observable');
        this.chat = message;
         console.log('chatData = ',this.chat);
         //this.messages.push(message);
         this.messages = this.chat;
         console.log('messages = ',this.messages);
       });
    }
    else
      console.log('no user loggedin in chat room');
          // this.getMessages().subscribe(message => {
    //   this.messages.push(message);
    // });
 
  }


  sendMessage() {
    if (this.chatService.user === 'customer'){
      console.log('customer in chat room');
      this.socket.emit('add-message', { text: this.message,sender:this.customerService.customerName,reciever: this.chatService.providerName,status: 'unread' });
      this.message = '';  
    }
    else if (this.chatService.user === 'serviceProvider'){
      this.socket.emit('add-message', { text: this.message,sender:'ajmal',reciever: 'khan',status: 'unread' });
      this.message = '';  
    }
    else
      console.log('no user loggedin in chat room');
    
  }

  getNewMessage(){
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    //this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
   }
   back(){
   // this.socket.disconnect();
   }
  ionViewDidEnter() {
    console.log('ioniviewDIdENter function called')
    if (this.chatService.user === 'customer'){
      console.log('customer in chat room');
      if(this.chatService.customerFrom==='fromProfile')
      {
        this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
      }
      else{
        this.chatData = [this.customerService.customerName,this.chatService.providerName];
      }
      this.nickname = this.customerService.customerName;
      this.chatService.emitEvent(this.chatData);
      this.chatService.getMessages().subscribe(message => {

        this.chat = message;
         console.log('chatData = ',this.chat);
         //this.messages.push(message);
         this.messages = this.chat;
         console.log('messages = ',this.messages);
       });
    }
    else if (this.chatService.user === 'serviceProvider'){
//this.messages = this.chatService.chat;
       this.chatData = [this.serviceProvidersService.getServiceProviderName(),this.chatService.senderOfServiceProvider];
      this.chatService.emitEvent(this.chatData);
     this.nickname = this.serviceProvidersService.getServiceProviderName();
    
      this.chatService.getMessages().subscribe(message => {
        console.log('data returned by the observable');
        this.chat = message;
         console.log('chatData = ',this.chat);
         //this.messages.push(message);
         this.messages = this.chat;
         console.log('messages = ',this.messages);
       });
    }
    else
      console.log('no user loggedin in chat room');
  }
}
interface chat{
  name: String,
  msg: String,
  reciever: String,
  status: String,
  created:Time
  }