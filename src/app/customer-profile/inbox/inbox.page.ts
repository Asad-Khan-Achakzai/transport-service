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
  constructor(private chatService: ChatServiceService,private router :Router,private socket: SocketIo, private customerService: CustomersService) { }

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
  for(let i =0;i<this.chatt.length;i++ ){
    let sender = this.chatt[i].name;
    for(let j = i;j<this.chatt.length;j++){
      if(sender === this.chatt[j].name){
        this.chatt.splice(j,1);
      }
    }
  }
  this.chatData = this.chatt;
  console.log('filtered array',this.chatData);
 }
 
 getMessages() {
  this.socket.emit('set-recieverForCustomerInbox',this.customerService.customerName);
  // Handle Output
 let observable = new Observable(observer => {
  this.socket.on('customerInboxData', (data) => {
    observer.next(data);
  });
 })
 return observable;
 }

 goforChat(chat){
  console.log('in goFOrChat');
  this.chatService.setSenderOfCustomer(chat.name);

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
  name: String,
  msg: String,
  reciever: String,
  status: String,
  created:Time
  }