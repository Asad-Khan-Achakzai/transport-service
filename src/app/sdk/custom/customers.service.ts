import { Injectable } from '@angular/core';
import {Path} from '../server.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  serviceProvider: any;
  observable: any;
  customerInfo:any;
  serviceProviderInfo:any;
  customerName:string;
  constructor(private authService: AuthService,private http: HttpClient) { }
  
  public userRegister(credentials: object): Observable<any> {
    const url = Path.getPath() + '/users/register';

    return this.http.post(url, credentials);
  }
  public customerLogin(credentials: object): Observable<any> {

    // this url will be http://localhost:3000/users/login
    const url = Path.getPath() + '/users/login';
    this.observable = this.http.post(url, credentials);
    this.observable.subscribe(
      data => {
       this.customerInfo = credentials;
      });
    return  this.http.post(url, credentials);

  }
  public async getCustomer(): Promise<any> {
    const url = Path.getPath() + '/users/getCustomer';
    const token = await this.authService.getTokenFromStorage();
    return this.http.post(url, this.customerInfo,{
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  
//   public serviceProviderLogin(credentials: object): Observable<any> {

//     // this url will be http://localhost:3000/providers/login
//     const url = customerRegistration.getPath() + '/providers/login';
//     this.observable = this.http.post(url, credentials);
//     this.observable.subscribe(
//       data => {
//        this.serviceProviderInfo = credentials;
//        console.log(this.serviceProviderInfo);
//       });
//     return  this.http.post(url, credentials);

//   }
  
//   public serviceProviderRegister(credentials: object): Observable<any> {
//     const url = customerRegistration.getPath() + '/providers/serviceProviderRegistration';
//    //credentials = credentials + this.serviceProvider;
//    this.serviceProvider['routes'] = credentials;
//     return this.http.post(url, this.serviceProvider);
//   }
//    public provideServices(credentials: object){
//      this.serviceProvider = credentials;
//      console.log(this.serviceProvider);
//    }
   
//   public async getServiceProvider(): Promise<any> {
//     const url = customerRegistration.getPath() + '/providers/getServiceProvider';
//     return this.http.post(url, this.serviceProviderInfo);
//   }
}
