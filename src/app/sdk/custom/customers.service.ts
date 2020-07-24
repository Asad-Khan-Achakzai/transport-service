import { Injectable } from '@angular/core';
import {Path} from '../server.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { Storage } from '@ionic/storage';
import { MixedService } from './mixed.service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  serviceProvider: any;
  observable: any;
  customerInfo:any;
  serviceProviderInfo:any;
  customerName:string;
  logedInCustomerId:string;
  logedInCustomerImage_url:string;
  prividerIdOfRoute:string;
  routeIdOfRoute:string;
  route;
  routeTiming:string;
  imageURL:string;
  customerData:customer;
  customerPassword:string;
  constructor(mixedService:MixedService,private authService: AuthService,private http: HttpClient,private storage: Storage) { }
  private fooSubject = new Subject<any>();
//sending image to side menu after user is successfully logined
  publishSomeData(data: any) {
      this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }
  public saveCustomerId(id:string){
    this.storage.set('customerId',id);
  }
  public saveCustomerName(id:string){
    this.storage.set('customerName',id);
  }
  public async getCustomerName(){
    let id ;
    await this.storage.get('customerName').then((val) => {
      console.log('id in funciton =',val);
       id = val;
    });
  //const id = await this.storage.get('serviceProviderId');
  return id;
}
  public saveCustomerImg(img:string){
    this.storage.set('customerImg',img);
  }

  public async getCustomerImg(){
    let Img ;
    await this.storage.get('customerImg').then((val) => {
      console.log('id in funciton =',val);
      Img = val;
    });
    return Img;
  }

    public async getCustomerId(){
      let id ;
      await this.storage.get('customerId').then((val) => {
        console.log('id in funciton =',val);
         id = val;
      });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  // public saveProviderRoute(route:string){
  //   this.storage.set('route',route);
  // }

  // public async getProviderRoute(){
  //   let Img ;
  //   await this.storage.get('route').then((val) => {
  //     console.log('id in funciton =',val);
  //     Img = val;
  //   });
  //   return Img;
  // }
  public saveProviderBookingData(route_id,providerID,routeTiming,bookedSeats,totalSeats,routePrice){
    this.storage.set('route_id',route_id);
    this.storage.set('routeTiming',routeTiming);
    this.storage.set('bookedSeats',bookedSeats);
    this.storage.set('providerID',providerID);
    this.storage.set('totalSeats',totalSeats);
    this.storage.set('routePrice',routePrice);
    console.log('id here',providerID);
  }
  public async getroute_id(){
    let Img ;
    await this.storage.get('route_id').then((val) => {
      console.log('id in funciton =',val);
      Img = val;
    });
    return Img;
  }
  public async getrouteTiming(){
    let Img ;
    await this.storage.get('routeTiming').then((val) => {
      console.log('id in funciton =',val);
      Img = val;
    });
    return Img;
  }
  public async getbookedSeats(){
    let Img ;
    await this.storage.get('bookedSeats').then((val) => {
      console.log('id in funciton =',val);
      Img = val;
    });
    return Img;
  }
  public async getTotalSeats(){
    let Img ;
    await this.storage.get('totalSeats').then((val) => {
      console.log('id in funciton =',val);
      Img = val;
    });
    return Img;
  }
  public async getproviderID(){
    let Img ;
    await this.storage.get('providerID').then((val) => {
      console.log('provider id in service =',val);
      Img = val;
    });
    return Img;
  }

  public saveProviderIdForProviderProfile(id:string){
    this.storage.set('providerId',id);
  }
  public async getproviderIdForProviderProfile(){
    let id ;
    await this.storage.get('providerId').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }

  public async getRoutePrice(){
    let id ;
    await this.storage.get('routePrice').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
  public userRegister(credentials: object): Observable<any> {
    const url = Path.getPath() + '/users/register';

    return this.http.post(url, credentials);
  }
  public udpateUser(credentials: object): Observable<any> {
    const url = Path.getPath() + `/users/${this.logedInCustomerId}`;

    return this.http.put(url, credentials);
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
    let credentials = {
      "id": await this.getCustomerId()
     
}
    const id = await this.getCustomerId();
    const url = Path.getPath() + '/users/getCustomer';
    const token = await this.authService.getTokenFromStorage();
    return this.http.post(url, credentials,{
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public async getCustomerForBooking(credentials:object): Promise<any> {
    const url = Path.getPath() + '/users/getCustomer';
    const token = await this.authService.getTokenFromStorage();
    return this.http.post(url, credentials);
  }
  // putprividerIdOfRoute(id){
  //   this.prividerIdOfRoute = id;
  // }
  // putrouteIdOfRoute(id){
  //   this.routeIdOfRoute = id;
  // }
  // putrouteTiming(time){
  //   this.routeTiming = time;
  // }
  // putroute(route){
  //   this.route = route;
  // }
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
interface customer {
  _id: string;
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
  imageUrl:string;
}