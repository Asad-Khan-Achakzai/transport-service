import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../sdk/custom/customers.service';
import { Router } from '@angular/router';
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
  constructor(private router :Router,private customerService: CustomersService) { }

  ngOnInit() {
     this.getCustomer();
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
