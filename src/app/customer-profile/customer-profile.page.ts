import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../sdk/custom/customers.service';
import { Router } from '@angular/router';
import { AuthService } from '../sdk/core/auth.service';
import { ChatServiceService } from '../chat-room/chat-service.service';
import { SocketIo } from 'ng-io';
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
  constructor(private socket: SocketIo,private chatService:ChatServiceService,private authService: AuthService, private router: Router, private customerService: CustomersService) { }

  ngOnInit() {
    this.chatService.customerLogedIn();
    this.getCustomer();
    this.diplayToken();
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
  async  getCustomer() {
    const observable = await this.customerService.getCustomer();
    observable.subscribe(
      data => {
        this.costomerInfo = data.data;
        this.email = this.costomerInfo.email;
        this.userName = this.costomerInfo.username;
        this.phone = this.costomerInfo.phone;
        this.cnic = this.costomerInfo.cnic;
        this.customerService.customerName = this.costomerInfo.username;
        console.log('data', data.data);
      },
      err => {
        console.log('err', err);
      }
    );
  }

}
interface customer {
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
}
