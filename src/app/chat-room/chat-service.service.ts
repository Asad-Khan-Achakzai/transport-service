import { Injectable } from '@angular/core';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { SocketIo } from 'ng-io';
import { Time } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
user:string;
senderOfServiceProvider:string;
senderIdOfServiceProvider:string
senderOfCustomer:string;
customerFrom:string;
//chatData: Array<String>;
chat;
//name of the provider that customers sends message to
providerName:string;
providerId:string;
  constructor(private serviceProvidersService: ServiceProvidersService, private socket: SocketIo) { }
  //these two functions tell which user is in the chatroom
  customerLogedIn(){
    this.user = 'customer';
  }
  serviceProviderLogedIn(){
    this.user = 'serviceProvider';
  }
  setSenderOfServiceProvider(id,sender){
    this.senderOfServiceProvider = sender;
    this.senderIdOfServiceProvider = id;
  }
  setSenderOfCustomer(sender){
   // this.senderOfCustomer = sender;
   this.providerId = sender;
  }
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
  setproviderName(name,id){
    this.providerId = id;
this.providerName = name;
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
  created: Time
}