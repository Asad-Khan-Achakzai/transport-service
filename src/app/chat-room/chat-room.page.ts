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
  senderImage_url:string;
  reciever;
  logedInUser;
  serviceProviderId;
  senderIdOfServiceProvider;
  serviceProviderName;
  serviceProviderImageURL;
  //customer data
  customerFrom;
  customerId;
  providerId;
  senderOfCustomer;
  providerimg;
  customerImg;
  private navParams = new NavParams
  constructor(private cdRef : ChangeDetectorRef,private chatService: ChatServiceService, private serviceProvidersService: ServiceProvidersService, private customerService: CustomersService, private navCtrl: NavController, private socket: SocketIo, private toastCtrl: ToastController) {
    //this function will always listen for the latest message 
    console.log('constructor called');
    

  this.newMsgs();
    



  }
  async newMsgs(){
    await this.setUser();
    if (this.logedInUser === 'customer') {
      this.getNewMessage().subscribe(message => {
        //to have the chat between them any of them can be either sender or reciever
        if ((this.customerId === message['recieverId'] || this.customerId === message['senderId']) &&(this.providerId=== message['senderId']||this.providerId=== message['recieverId'])) {
          this.messages.push(message);
        }

      });
    }
    else if (this.logedInUser === 'serviceProvider') {
      console.log('here');
      this.getNewMessage().subscribe(message => {
        if ((this.serviceProviderId === message['recieverId'] || this.serviceProviderId === message['senderId'])&& (this.senderIdOfServiceProvider ===message['senderId']|| this.senderIdOfServiceProvider=== message['recieverId'])) {
         console.log('message recieved = ',message);
         
          this.messages.push(message);
        
        }

      });
    }
    else
      console.log('no user ');


    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }
  async setUser()
  {
    this.logedInUser = await this.chatService.getLogedInUser();
    console.log('user =',this.logedInUser);
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
  async ngOnInit() {

    this.logedInUser = await this.chatService.getLogedInUser();

    console.log('logedin user in chatroom = ',await this.chatService.getLogedInUser());
    this.scrollToBottom();
    
    if (this.logedInUser === 'customer') {

      this.customerFrom = await this.chatService.getCustomerFrom();
      this.customerId = await this.customerService.getCustomerId();
      this.customerImg =await this.customerService.getCustomerImg();
      this.senderOfCustomer = await this.chatService.getsenderOfCustomer();
      this.providerId = await this.chatService.getproviderId();
      this.providerimg = await this.chatService.getproviderImage();
      this.reciever = await this.customerService.getCustomerName();
      console.log('customer From =',this.customerFrom);
      console.log('customerId=',this.customerId);
      console.log('customerImg =',this.customerImg);
      console.log('senderOfCustomer =',this.senderOfCustomer);
      console.log('providerId=',this.providerId);
      console.log('providerimg =',this.providerimg);
      console.log('reciever =',this.reciever);
      this.nickname = this.reciever;
      console.log('customer in chat room');
      if (this.customerFrom  === 'fromProfile') {
        //        this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
       // this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];
       this.chatData = [this.customerId, this.providerId]; 
       console.log('this.ChatData = ', this.chatData);

      }
      else {
        // this.chatData = [this.customerService.customerName,this.chatService.providerName];
        // this.chatData = [this.customerService.logedInCustomerId, this.chatService.providerId];
        this.chatData = [this.customerId, this.providerId];
        console.log('this.ChatData = ', this.chatData);
      }
      
      //console.log('reciver = ',this.customerService.customerName);
    //  this.sender = this.chatService.senderOfCustomer;
    this.sender = this.senderOfCustomer;  
   // console.log('sender image = ',this.chatService.providerImage);
     // this.senderImage_url  = this.chatService.providerImage;
     this.senderImage_url = this.providerimg;
      this.chatService.emitEvent(this.chatData);
     // this.nickname = await this.customerService.getCustomerName();
      this.chatService.getMessages().subscribe(message => {
        this.chat = message;
        console.log('chatData = ', this.chat);
        //this.messages.push(message);
        this.messages = this.chat;
        console.log('messages = ', this.messages);
      });
    }
    else if (this.logedInUser === 'serviceProvider') {
      console.log('service provder in chat room');
      this.serviceProviderId = await this.serviceProvidersService.getServiceProviderId();
this.senderIdOfServiceProvider = await this.chatService.getsenderIdOfServiceProvider();
this.serviceProviderName= await this.serviceProvidersService.getServiceProviderName();
this.serviceProviderImageURL = await this.serviceProvidersService.getServiceProviderImg();
//      this.chatData = [this.serviceProvidersService.serviceProviderIdInbox, this.chatService.senderIdOfServiceProvider];
this.chatData = [this.serviceProviderId, this.senderIdOfServiceProvider];
      this.reciever = await this.serviceProvidersService.getServiceProviderName();

      // this.sender = this.chatService.senderOfServiceProvider;
      // this.senderImage_url = this.chatService.senderImage_urlOfServiceProvider;
      this.sender = await this.chatService.getsenderOfServiceProvider();
      this.senderImage_url = await this.chatService.getsenderImage_urlOfServiceProvider();
      this.chatService.emitEvent(this.chatData);
      this.nickname = await this.serviceProvidersService.getServiceProviderName();

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
    // this.cdRef.detectChanges();
    // this.scrollToBottom();
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
    if (this.logedInUser === 'customer') {
      console.log('customer in chat room');
      
      // this.socket.emit('add-message', { text: this.message, sender: this.customerService.customerName, senderId: this.customerService.logedInCustomerId, reciever: this.chatService.providerName, recieverId: this.chatService.providerId, status: 'unread',reciverImage_url: this.chatService.providerImage,senderImage_url: this.customerService.logedInCustomerImage_url });
      this.socket.emit('add-message', { text: this.message, sender: this.reciever, senderId: this.customerId, reciever: this.senderOfCustomer, recieverId: this.providerId, status: 'unread',reciverImage_url: this.providerimg,senderImage_url: this.customerImg});
      this.message = '';
    }
    else if (this.logedInUser === 'serviceProvider') {
      console.log('senderImage_url',this.serviceProviderImageURL);
      // this.socket.emit('add-message', { text: this.message, sender: this.serviceProvidersService.getServiceProviderName(),senderId:this.serviceProvidersService.serviceProviderIdInbox, reciever: this.chatService.senderOfServiceProvider, recieverId: this.chatService.senderIdOfServiceProvider, status: 'unread',reciverImage_url:this.chatService.senderImage_urlOfServiceProvider,senderImage_url: this.serviceProvidersService.serviceProviderImage_url });
      this.socket.emit('add-message', { text: this.message, sender: this.serviceProviderName,senderId:this.serviceProviderId, reciever: this.sender, recieverId: this.senderIdOfServiceProvider, status: 'unread',reciverImage_url:this.senderImage_url,senderImage_url: this.serviceProviderImageURL });
      this.message = '';
    }
    else
      console.log('no user loggedin in chat room');
this.scrollToBottom();
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
  async ionViewDidEnter() {
    this.scrollToBottom();
    this.logedInUser = await this.chatService.getLogedInUser();

    if (this.logedInUser === 'customer') {
      
      this.customerFrom = await this.chatService.getCustomerFrom();
      this.customerId = await this.customerService.getCustomerId();
      this.customerImg =await this.customerService.getCustomerImg();
      this.senderOfCustomer = await this.chatService.getsenderOfCustomer();
      this.providerId = await this.chatService.getproviderId();
      this.providerimg = await this.chatService.getproviderImage();
      this.reciever = await this.customerService.getCustomerName();
      console.log('customer in chat room');
      if (this.customerFrom === 'fromProfile') {
        //this.chatData = [this.customerService.customerName,this.chatService.senderOfCustomer];
        this.chatData = [this.customerId, this.providerId];
      }
      else {
        //          this.chatData = [this.customerService.customerName,this.chatService.providerName];
        this.chatData = [this.customerId, this.providerId];

      }
      this.reciever = await this.customerService.getCustomerName();
      this.sender = this.senderOfCustomer;
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
    else if (this.logedInUser === 'serviceProvider') {

       //this.chatData = [this.serviceProvidersService.serviceProviderIdInbox, this.chatService.senderIdOfServiceProvider]; 
       this.serviceProviderId = await this.serviceProvidersService.getServiceProviderId();
    this.senderIdOfServiceProvider = await this.chatService.getsenderIdOfServiceProvider();
    this.serviceProviderName= await this.serviceProvidersService.getServiceProviderName();
this.serviceProviderImageURL = await this.serviceProvidersService.getServiceProviderImg();
       this.chatData = [this.serviceProviderId, this.senderIdOfServiceProvider];
      this.chatService.emitEvent(this.chatData);
      this.nickname = await this.serviceProvidersService.getServiceProviderName();

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
  created: Time,
   reciverImage_url: String,
  senderImage_url:String
}