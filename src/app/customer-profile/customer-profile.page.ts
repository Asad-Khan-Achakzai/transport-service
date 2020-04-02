import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../sdk/custom/customers.service';
import { Router } from '@angular/router';
import { AuthService } from '../sdk/core/auth.service';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {
costomerInfo:customer;
email:string;
userName: string;
phone: string;
cnic:string;
  constructor(private authService: AuthService,private router :Router,private customerService: CustomersService) { }

  ngOnInit() {
     this.getCustomer();
this.diplayToken();  }
  public async diplayToken(): Promise<any> {
      const token = await this.authService.getTokenFromStorage();    
      console.log('token :',token);
  }
  goToDashboard(){
    this.router.navigateByUrl('/customer-dashboard');
  }
  back(){
    this.router.navigateByUrl('/home');
   }
  async  getCustomer(){
    const observable = await this.customerService.getCustomer();
    observable.subscribe(
      data => {
        this.costomerInfo = data.data;
        this.email = this.costomerInfo.email;
        this.userName = this.costomerInfo.username;
        this.phone = this.costomerInfo.phone;
        this.cnic = this.costomerInfo.cnic;
    console.log(this.costomerInfo.email);
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
