import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { ChatServiceService } from 'src/app/chat-room/chat-service.service';
import { Router } from '@angular/router';
import { SocketIo } from 'ng-io';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  chatData;
  chats;
  chatt: chat[];
  unreadMessages: chat[];
  countArr: chatCount[];
  customerId;
  loading = true;
  skeletonlist = [1, 2, 3, 4, 5];
  constructor(public alertController: AlertController, private menu: MenuController, private chatService: ChatServiceService, private router: Router, private socket: SocketIo, private customerService: CustomersService) {
    this.getNewMessage().subscribe(message => {
      if (this.customerService.logedInCustomerId === message['recieverId'] || this.customerService.logedInCustomerId === message['senderId']) {
        this.chats.push(message);
        this.filterArray(this.chats);
      }

    });
  }
  async refreshPage(event) {

    this.loading = true;
    (await this.getMessages()).subscribe(message => {
      this.chats = message;
      console.log('inbox data = ', message)
      this.filterArray(this.chats);
    });
    //after reload the image in side menu is lost so here i send again the picture
    let img = await this.customerService.getCustomerImg();
    this.customerService.publishSomeData({
      customerImg: img
    })
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  async delete(id: number): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure to  <strong>Delete</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {

            let chatData = [this.chatData[id].senderId, this.chatData[id].recieverId];
            console.log('chatdata = ', chatData);
            this.socket.emit('set-deletChat', chatData);
            (await this.getMessages()).subscribe(message => {
              this.chats = message;
              console.log('inbox data = ', message)
              this.filterArray(this.chats);
            });
            //after reload the image in side menu is lost so here i send again the picture
            let img = await this.customerService.getCustomerImg();
            this.customerService.publishSomeData({
              customerImg: img
            })
          }
        }
      ]
    });
    await alert.present();

  }
  async ngOnInit() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    (await this.getMessages()).subscribe(message => {
      this.chats = message;
      console.log('inbox data = ', message)
      this.filterArray(this.chats);
    });
    //after reload the image in side menu is lost so here i send again the picture
    let img = await this.customerService.getCustomerImg();
    this.customerService.publishSomeData({
      customerImg: img
    })
  }
  //filtering array to have each sender only once;
  filterArray(chats) {
    //transfrer the copy of chats
    this.chatt = chats.slice();
    //find unread messages
    this.unreadMessages = this.chatt.filter(item => item.status == 'unread');

    const result = [...this.unreadMessages.reduce((mp, o) => {
      if (!mp.has(o.recieverId)) mp.set(o.recieverId, { ...o, count: 0 });
      mp.get(o.recieverId).count++;
      return mp;
    }, new Map).values()];
    this.countArr = result.slice();;
    for (let i = 0; i < this.countArr.length; i++) {
      console.log('result =', this.countArr[i].count);
    }
    console.log('countArr = ', this.countArr);
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
    this.loading = false;
    console.log('filtered array', this.chatData);
  }

  async getMessages() {
    this.customerId = await this.customerService.getCustomerId();
    // this.socket.emit('set-recieverForCustomerInbox',this.customerService.customerName);
    this.socket.emit('set-recieverForInbox', this.customerId);

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
        console.log('messages recieved = ', data);
        observer.next(data);
      });
    })
    return observable;
  }


  goforChat(chat) {

    this.chatService.setSenderOfCustomer(chat.name, chat.senderId, chat.senderImage_url, 'fromProfile');
    // this.chatService.senderOfCustomer = chat.name;
    // this.chatService.providerImage = chat.senderImage_url;
    // this.chatService.setCustomerFrom('fromProfile');
    this.router.navigateByUrl('/chat-room');
  }
  async ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    //this.getMessages();
    (
      //this.getMessages();
      await this.getMessages()).subscribe(message => {
        this.chats = message;
        console.log('ionViewDidEnter Data = ', message)
        this.filterArray(this.chats);
      });
  }
}
interface chat {
  msgId: string,
  senderId: String,
  name: String,
  recieverId: String,
  reciever: String,
  msg: String,
  status: String,
  created: Time,
  reciverImage_url: String,
  senderImage_url: String
}
interface chatCount {

  count: number,
  msgId: string,
  senderId: String,
  name: String,
  recieverId: String,
  reciever: String,
  msg: String,
  status: String,
  created: Time,
  reciverImage_url: String,
  senderImage_url: String
}