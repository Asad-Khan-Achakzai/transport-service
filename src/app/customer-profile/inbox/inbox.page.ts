import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ChatServiceService } from 'src/app/chat-room/chat-service.service';
import { Router } from '@angular/router';
import { SocketIo } from 'ng-io';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/sdk/custom/customers.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  chatData;
  chats;
  chatt:chat[];
  unreadMessages:chat[];
  countArr:chatCount[];
  constructor(private chatService: ChatServiceService,private router :Router,private socket: SocketIo, private customerService: CustomersService) { 
    this.getNewMessage().subscribe(message => {
      if (this.customerService.logedInCustomerId === message['recieverId'] || this.customerService.logedInCustomerId === message['senderId']) {
        this.chats.push(message);
        this.filterArray(this.chats);
      }

    });
  }

  ngOnInit() {
    this.getMessages().subscribe(message => {
      this.chats = message;
      console.log('inbox data = ',message)
      this.filterArray(this.chats);
     });
  }
  //filtering array to have each sender only once;
filterArray(chats){
  this.chatt = chats.slice();
  this.unreadMessages = this.chatt.filter(item => item.status == 'unread');
 const result = [...this.unreadMessages.reduce( (mp, o) => {
  if (!mp.has(o.name)) mp.set(o.name, { ...o, count: 0 });
  mp.get(o.name).count++;
  return mp;
}, new Map).values()];
this.countArr = result.slice();;
for(let i =0;i<this.countArr.length;i++){
  console.log('result =',this.countArr[i].count);  
}
console.log('countArr = ',this.countArr);
  const uniqByProp = prop => arr =>
  Object.values(
    arr.reduce(
      (acc, item) => (
        item && item[prop] && (acc[item[prop]] = item), acc
      ), // using object mutation (faster)
      {}
    )
  );

// usage (same as above):

const uniqueById = uniqByProp("senderId");

const unifiedArray = uniqueById(chats);
  this.chatData = unifiedArray;
  console.log('filtered array',this.chatData);
 }
 
 getMessages() {
  // this.socket.emit('set-recieverForCustomerInbox',this.customerService.customerName);
  this.socket.emit('set-recieverForCustomerInbox',this.customerService.logedInCustomerId);

  // Handle Output
 let observable = new Observable(observer => {
  this.socket.on('customerInboxData', (data) => {
    observer.next(data);
  });
 })
 return observable;
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


 goforChat(chat){
  console.log('in goFOrChat');
  this.chatService.setSenderOfCustomer(chat.senderId);
this.chatService.senderOfCustomer = chat.name;
this.chatService.setCustomerFrom('fromProfile');
this.router.navigateByUrl('/chat-room');  
}
ionViewDidEnter() {

  //this.getMessages();
  this.getMessages().subscribe(message => {
    this.chats = message;
    console.log('ionViewDidEnter Data = ',message)
    this.filterArray(this.chats);
   });  }
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
  interface chatCount{
    
    count:number,
    msgId:string,
    senderId:String,
    name: String,
    recieverId:String,
    reciever: String,
    msg: String,
    status: String,
    created:Time
    }