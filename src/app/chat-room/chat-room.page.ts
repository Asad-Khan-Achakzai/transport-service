import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavParams, ToastController, NavController, IonContent } from '@ionic/angular';
import { SocketIo } from 'ng-io';
import { Observable } from 'rxjs';
import { CustomersService } from '../sdk/custom/customers.service';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { ChatServiceService } from './chat-service.service';
import { Time } from '@angular/common';
//import { Content } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  //@ViewChild(Content,{static:false}) content: Content;
  //@ViewChild('content',{static:false}) content: Content;
  @ViewChild('IonContent', { static: true }) IonContent: IonContent;


  chat;
  chatData: Array<String>;
  messages = [];
  nickname = '';
  message = '';
  sender;
  reciever;
  private navParams = new NavParams
  constructor(private cdRef : ChangeDetectorRef,private chatService: ChatServiceService, private serviceProvidersService: ServiceProvidersService, private customerService: CustomersService, private navCtrl: NavController, private socket: SocketIo, private toastCtrl: ToastController) {
    //this function will always listen for the latest message 
    console.log('constructor called');

    if (this.chatService.user === 'customer') {
      this.getNewMessage().subscribe(message => {
        //to have the chat between them any of them can be either sender or reciever
        if ((this.customerService.logedInCustomerId === message['recieverId'] || this.customerService.logedInCustomerId === message['senderId']) &&(this.chatService.providerId=== message['senderId']||this.chatService.providerId=== message['recieverId'])) {
          this.messages.push(message);
        }

      });
    }
    else if (this.chatService.user === 'serviceProvider') {
      this.getNewMessage().subscribe(message => {
        if ((this.serviceProvidersService.serviceProviderIdInbox === message['recieverId'] || this.serviceProvidersService.serviceProviderIdInbox === message['senderId'])&& (this.chatService.senderIdOfServiceProvider===message['senderId']|| this.chatService.senderIdOfServiceProvider=== message['recieverId'])) {
         console.log('message recieved = ',message);
         
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
  scrollToBottom(): void {
    this.IonContent.scrollToBottom(300);
  }
  scrollTo() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
  ;
  }
  scrollToBottomOnInit() {
   // this.content.scrollToBottom(300);
  }
  ngOnInit() {
    this.scrollToBottom();
    
    if (this.chatService.user === 'customer') {
      console.log('customer in chat room');
      if (this.chatService.customerFrom === 'fromProfile') {
        //        this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
        this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];
        console.log('this.ChatData = ', this.chatData);

      }
      else {
        // this.chatData = [this.customerService.customerName,this.chatService.providerName];
        this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];
        console.log('this.ChatData = ', this.chatData);
      }
      this.reciever = this.customerService.customerName;
      this.sender = this.chatService.senderOfCustomer;
      this.chatService.emitEvent(this.chatData);
      this.nickname = this.customerService.customerName;
      this.chatService.getMessages().subscribe(message => {
        this.chat = message;
        console.log('chatData = ', this.chat);
        //this.messages.push(message);
        this.messages = this.chat;
        console.log('messages = ', this.messages);
      });
    }
    else if (this.chatService.user === 'serviceProvider') {
      console.log('service provder in chat room');
      //      this.chatData = [this.serviceProvidersService.getServiceProviderName(),this.chatService.senderOfServiceProvider];
      this.chatData = [this.serviceProvidersService.serviceProviderIdInbox, this.chatService.senderIdOfServiceProvider];
      this.reciever = this.serviceProvidersService.getServiceProviderName();
      this.sender = this.chatService.senderOfServiceProvider;
      this.chatService.emitEvent(this.chatData);
      this.nickname = this.serviceProvidersService.getServiceProviderName();

      this.chatService.getMessages().subscribe(message => {
        console.log('data returned by the observable');
        this.chat = message;
        console.log('chatData = ', this.chat);
        //this.messages.push(message);
        this.messages = this.chat;
        console.log('messages = ', this.messages);
      });
    }
    else
      console.log('no user loggedin in chat room');
    // this.getMessages().subscribe(message => {
    //   this.messages.push(message);
    // });

  }
  //this is used when the status is updated and system should detect the changes otherwise it will cause error
  //of change detected
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    this.scrollToBottom();
  }
//to mark the status of messages as read 
markStatus(msg:chat){
  console.log('functionc called');
  console.log('status marked of =',msg);
  this.socket.emit('set-status',msg.msgId);
    this.messages[this.messages.indexOf(msg)].status = "read";
  console.log('markes status = ',this.messages[this.messages.indexOf(msg)])  
  
}


  sendMessage() {
    if (this.chatService.user === 'customer') {
      console.log('customer in chat room');
      this.socket.emit('add-message', { text: this.message, sender: this.customerService.customerName, senderId: this.customerService.logedInCustomerId, reciever: this.chatService.providerName, recieverId: this.chatService.providerId, status: 'unread' });
      this.message = '';
    }
    else if (this.chatService.user === 'serviceProvider') {
      this.socket.emit('add-message', { text: this.message, sender: this.serviceProvidersService.getServiceProviderName(),senderId:this.serviceProvidersService.serviceProviderIdInbox, reciever: this.chatService.senderOfServiceProvider, recieverId: this.chatService.senderIdOfServiceProvider, status: 'unread' });
      this.message = '';
    }
    else
      console.log('no user loggedin in chat room');

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
  back() {
    // this.socket.disconnect();
  }
  ionViewDidEnter() {
    console.log('ioniviewDIdENter function called')
    if (this.chatService.user === 'customer') {
      console.log('customer in chat room');
      if (this.chatService.customerFrom === 'fromProfile') {
        //this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
        this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];
      }
      else {
        //          this.chatData = [this.customerService.customerName,this.chatService.providerName];
        this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];

      }
      this.reciever = this.customerService.customerName;
      this.sender = this.chatService.senderOfCustomer;
     // this.nickname = this.customerService.customerName;
      this.chatService.emitEvent(this.chatData);
      this.chatService.getMessages().subscribe(message => {

        this.chat = message;
        console.log('chatData = ', this.chat);
        //this.messages.push(message);
        this.messages = this.chat;
        console.log('messages = ', this.messages);
      });
    }
    else if (this.chatService.user === 'serviceProvider') {
      //this.messages = this.chatService.chat;
      this.chatData = [this.serviceProvidersService.serviceProviderIdInbox, this.chatService.senderIdOfServiceProvider]; this.chatService.emitEvent(this.chatData);
      this.nickname = this.serviceProvidersService.getServiceProviderName();

      this.chatService.getMessages().subscribe(message => {
        console.log('data returned by the observable');
        this.chat = message;
        console.log('chatData = ', this.chat);
        //this.messages.push(message);
        this.messages = this.chat;
        console.log('messages = ', this.messages);
      });
    }
    else
      console.log('no user loggedin in chat room');
  }
}
interface chat {
  msgId:string,
  _id:string,
  senderId: String,
  name: String,
  recieverId: String,
  reciever: String,
  msg: String,
  status: String,
  created: Time
}