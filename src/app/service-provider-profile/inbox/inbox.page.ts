import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketIo } from 'ng-io';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { ChatServiceService } from 'src/app/chat-room/chat-service.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
serviceProviderName:string;
chatData;
chats;
chatt:chat[];
unreadMessages:chat[];
countArr:chatCount[];
  constructor(private chatService: ChatServiceService,private router :Router,private socket: SocketIo,private serviceProvidersService: ServiceProvidersService) { 
    this.getNewMessage().subscribe(message => {
      if (this.serviceProvidersService.serviceProviderIdInbox === message['recieverId'] || this.serviceProvidersService.serviceProviderIdInbox === message['senderId']) {
        this.chats.push(message);
        console.log('new message recieved = ',message);
        this.filterArray(this.chats);
      }

    });
  }

  ngOnInit() {
    this.serviceProviderName = this.serviceProvidersService.getServiceProviderName();
//this.getMessages();
this.getMessages().subscribe(message => {
  this.chats = message;
  console.log('inbox data = ',message)
  this.filterArray(this.chats);
 });
}
countArray(chat){
  let array:[]
  for(let i=0;i<chat.length;i++){

  }
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

//  var count = {};
// this.unreadMessages.forEach(function(i) { count[i] = (count[i]||0) + 1;});
// console.log(count);

 //first approach
//  const filteredArr = chats.reduce((acc, current) => {
//   const x = acc.find(item => item.senderId === current.senderId);
//   if (!x) {
//     return acc.concat([current]);
//   } else {
//     return acc;
//   }
// }, []);
//  this.chatData = filteredArr;
/**
 * second apprach
 * using object mutation
 **/
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
//third approach
// const seen = new Set();
// const filteredArr = chats.filter(el => {
//   const duplicate = seen.has(el.senderId);
//   seen.add(el.senderId);
//   return !duplicate;
// });
//  this.chatData = filteredArr;

//this approach is not working
//  for(let i =0;i<this.chatt.length;i++ ){
//    let sender = this.chatt[i].name;
//    for(let j = i;j<this.chatt.length;j++){
//      if(sender === this.chatt[j].name){
//        this.chatt.splice(j,1);
//      }
//    }
//  }
//  this.chatData = this.chatt;
this.chatData = unifiedArray;
 console.log('filtered array',this.chatData);
}

getMessages() {
 this.socket.emit('set-recieverForInbox',this.serviceProvidersService.serviceProviderIdInbox);
 // Handle Output
let observable = new Observable(observer => {
 this.socket.on('inboxData', (data) => {
   observer.next(data);
 });
})

return observable;
}
getNewMessage() {
  let observable = new Observable(observer => {
    this.socket.on('message', (data) => {
      observer.next(data);
    });
  })
  return observable;
}
goforChat(chat){
  console.log('in goFOrChat');
  this.chatService.setSenderOfServiceProvider(chat.senderId,chat.name);


this.router.navigateByUrl('/chat-room');  
}
ionViewDidEnter() {
  this.serviceProviderName = this.serviceProvidersService.getServiceProviderName();;
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