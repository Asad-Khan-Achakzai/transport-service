import { Injectable } from '@angular/core';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { SocketIo } from 'ng-io';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
//user:string;
senderOfServiceProvider:string;
senderIdOfServiceProvider:string;
senderImage_urlOfServiceProvider:string
senderOfCustomer:string;
customerFrom:string;
//chatData: Array<String>;
chat;
//name of the provider that customers sends message to
providerName:string;
providerId:string;
providerImage:string;
  constructor(private serviceProvidersService: ServiceProvidersService, private socket: SocketIo,private storage: Storage) { }
  //these two functions tell which user is in the chatroom
  // customerLogedIn(){
  //   this.user = 'customer';
  // }
  // serviceProviderLogedIn(){
  //   this.user = 'serviceProvider';
  // }
  public serviceProviderLogedIn(){
    this.storage.set('logedIn','serviceProvider');
  }
  public customerLogedIn(){
    this.storage.set('logedIn','customer');
  }
  public async getLogedInUser(){
    let id ;
    await this.storage.get('logedIn').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  //set from service provider inbox
  setSenderOfServiceProvider(id,sender,senderImage_url){
    this.storage.set('senderOfServiceProvider',sender);
    this.storage.set('senderIdOfServiceProvider',id);
    this.storage.set('senderImage_urlOfServiceProvider',senderImage_url);
    // this.senderOfServiceProvider = sender;
    // this.senderIdOfServiceProvider = id;
    // this.senderImage_urlOfServiceProvider = senderImage_url;
  }
 
  public async getsenderOfServiceProvider(){
    let id ;
    await this.storage.get('senderOfServiceProvider').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public async getsenderIdOfServiceProvider(){
    let id ;
    await this.storage.get('senderIdOfServiceProvider').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public async getsenderImage_urlOfServiceProvider(){
    let id ;
    await this.storage.get('senderImage_urlOfServiceProvider').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  setSenderOfCustomer(senderOfCustomer,senderId,providerImage,customerFrom){
    this.storage.set('providerId',senderId);
    this.storage.set('senderOfCustomer',senderOfCustomer);
    this.storage.set('providerImage',providerImage);
    this.storage.set('customerFrom',customerFrom);
    //this.providerId = sender;
  }
  public async getCustomerFrom(){
    let id ;
    await this.storage.get('customerFrom').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public async getsenderOfCustomer(){
    let id ;
    await this.storage.get('senderOfCustomer').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public async getproviderId(){
    let id ;
    await this.storage.get('providerId').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public async getproviderImage(){
    let id ;
    await this.storage.get('providerImage').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  // setSenderOfCustomer(sender){
  //  // this.senderOfCustomer = sender;
  //  this.providerId = sender;
  // }
  //sets whether custoemr is coming from own profile or provider's profile
  setCustomerFrom(from){
    this.customerFrom = from;
  }
  emitEvent(chatData){
    console.log('event emite function called');
    this.socket.emit('set-getChat',chatData);
  
  }
fillChatArray(arr){
  this.chat = arr;
}
  setproviderName(name,id,imageUrl){
    this.storage.set('providerId',id);
    this.storage.set('senderOfCustomer',name);
    this.storage.set('providerImage',imageUrl);
//     this.providerId = id;
// this.providerName = name;
// this.providerImage = imageUrl;
console.log('image in service = ',this.providerImage);
  }
  
  getMessages() {
    //     let chatData = [this.serviceProvidersService.getServiceProviderName(),this.chatService.senderOfServiceProvider];
    //  this.chatData[0] ='ajmal';
    //   this.chatData[1]='khan';  
    //   this.socket.emit('set-getChat',this.chatData);
     // Handle Output
     console.log('displaying data');
    
    let observable = new Observable(observer => {
     this.socket.on('output', (data) => {
    
       observer.next(data);
     });
    })
     return observable;
    //     let observable = new Observable(observer => {
    //       this.socket.on('message', (data) => {
    //         observer.next(data);
    //       });
    //     })
    //     return observable;
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