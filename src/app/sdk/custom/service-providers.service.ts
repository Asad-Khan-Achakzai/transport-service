import { Injectable } from '@angular/core';
import { Path } from '../server.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumericValueAccessor } from '@ionic/angular';
import { serviceProvider } from '../../customer-dashboard/service-provider.model';
import { Storage } from '@ionic/storage';
import {Subject} from 'rxjs';
export class Routes {
  

  timing: string;
  totalSeats: number;
  availableSeats: number;
  priceperSeat:number;
  departure: string;
  destination: string;
}
@Injectable({
  providedIn: 'root'
})

export class ServiceProvidersService {
  serviceProviderNameInbox:string;
  serviceProviderIdInbox:string;
  serviceProviderImage_url:string;
  services: Routes[];
  observable: any;
  serviceProviderInfo: any;
  logedInServiceProvider:serviceProvider;
  routes: Routes[];
  routId;
  serviceProviderData:serviceProvider;
  oldServiceProviderInfo: serviceProvider[];
  routeForManualBooking;
  serviceProviderPass:string;
  servicesForEditPage:Routes[];
  constructor(private http: HttpClient,private storage: Storage) {
    this.routes = [new Routes()];
  }
  //sending image to side menu after user is successfully logined
  private fooSubject = new Subject<any>();
  publishSomeData(data: any) {
    this.fooSubject.next(data);
}

getObservable(): Subject<any> {
    return this.fooSubject;
}
  public saveServiceProviderImg(img:string){
    
    this.storage.set('ServiceProviderImg',img);
  }
  public async getServiceProviderImg(){
    let Img ;
    await this.storage.get('ServiceProviderImg').then((val) => {
      
      Img = val;
    });
    return Img;
  }
  public saveRoutId(id:string){
    
    this.storage.set('routeId',id);
  }
  public async getRouteId(){
    let Img ;
    await this.storage.get('routeId').then((val) => {
      
      Img = val;
    });
    return Img;
  }
  public saveServiceProviderId(id:string){
    this.storage.set('serviceProviderId',id);
  }
  public async getServiceProviderId(){
    let id ;
    await this.storage.get('serviceProviderId').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
 
  public saveServiceProviderName(id:string){
    this.storage.set('serviceProviderName',id);
  }
  public async getServiceProviderName(){
    let id ;
    await this.storage.get('serviceProviderName').then((val) => {
       id = val;
    });
    //const id = await this.storage.get('serviceProviderId');
    return id;
  }
 
  putrouteForManualBooking(route){
    this.routeForManualBooking = route;
  }
  public sendServices(array2: Routes[]): void {
    console.log(array2);
    this.services = array2;
  }
  public getServices() {
    return this.services;
  }
  public async updateServiceProvider(credentials): Promise<any> {
    console.log('credentials = ',credentials);
    console.log('function called from service');
    const url = Path.getPath() + '/providers/updateServiceProvider';

    //    const url = Path.getPath() + `/providers/${credentials.id}`;
    //credentials = credentials + this.serviceProvider;
    //  this.serviceProvider['routes'] = credentials;
    const token = 'blabla';
    return this.http.post(url, credentials);
  }
  public async editServiceProvider(credentials: object): Promise<Observable<any>> {
    const id = await this.getServiceProviderId();
    const url = Path.getPath() + `/providers/${id}`;

    return this.http.put(url, credentials);
  }
  public async editRouteOfServiceProvider(providerId,credentials: object): Promise<Observable<any>> {
    const url = Path.getPath() + `/providers/${providerId}`;
    return this.http.post(url, credentials);
  }
  public serviceProviderRegister(credentials: object): Observable<any> {
    const url = Path.getPath() + '/providers/serviceProviderRegistration';
    //credentials = credentials + this.serviceProvider;
    //  this.serviceProvider['routes'] = credentials;
    return this.http.post(url, credentials);
  }

  public serviceProviderLogin(credentials: object): Observable<any> {

    // this url will be http://localhost:3000/providers/login
    const url = Path.getPath() + '/providers/login';
    this.observable = this.http.post(url, credentials);
    this.observable.subscribe(
      data => {
        this.serviceProviderInfo = credentials;
        console.log(this.serviceProviderInfo);
      });
    return this.http.post(url, credentials);

  }
  // public async getServiceProvider(): Promise<any> {
  //   const url = Path.getPath() + '/providers/getServiceProvider';
  //   return this.http.post(url, this.serviceProviderInfo);
  // }
  public  async getServiceProvider(_id): Promise<Observable<any>> {
    //const _id = await this.getServiceProviderId();
    console.log('id one =',_id);
    const url = Path.getPath() + `/providers/${_id}`;
    return this.http.get(url, this.serviceProviderInfo);
  }
  // public udpateUser(credentials: object): Observable<any> {
  //   const url = Path.getPath() + `/users/${this.serviceProviderIdInbox }`;

  //   return this.http.put(url, credentials);
  // }

  public putServiceProviderDat(data)
  {
    this.serviceProviderData = data;
    console.log('data serviceprovider = ',this.serviceProviderData);
  }
  public getAllServiceProvider(): Observable<any> {

    // this url will be http://localhost:3000/providers/login
    const url = Path.getPath() + '/providers/getAllServiceProviders';
    // this.observable = this.http.get(url);
    // this.observable.subscribe(
    //   data => {
    //   });
    let data;
    return this.http.post(url,data);

  }
  // public async getAllServiceProvider(): Promise<any> {
  //   const url = Path.getPath() + '/providers/getAllServiceProviders';
  //   return this.http.get(url);
 // }
 filloldServiceProviderInfo(info){
this.oldServiceProviderInfo = info;
 }
  async  getProvider() {
    const observable = await this.getAllServiceProvider();
    observable.subscribe(
      data => {
        this.oldServiceProviderInfo = data.data.docs;
      },
      err => {
        console.log('err', err);
      }
    );
  }
  async getAllProviders() {
    const observable = await this.getAllServiceProvider();
    observable.subscribe(
      data => {
        this.oldServiceProviderInfo = data.data.docs;
        console.log('getAllProviders',this.oldServiceProviderInfo)
        return this.oldServiceProviderInfo;
      },
      err => {
        console.log('err', err);
      }
    );return this.oldServiceProviderInfo;
  }
  getSingleProvider(id: string) {
    return {
      ...this.oldServiceProviderInfo.find(provider => {
        return provider._id === id;
      })
    };
  }
  //name for the Service provider Inbox
  serviceProviderNameForInbox(name){
    this.serviceProviderNameInbox = name;
    console.log('serviceProviderNameForInbox',this.serviceProviderNameInbox);
      }
      setServiceProviderIdForInbox(id){
        this.serviceProviderIdInbox = id;
          }


      // getServiceProviderName(){
      //   console.log('getServiceProviderName',this.serviceProviderNameInbox);
      //   return this.serviceProviderNameInbox;
      //     }
    public putRoutId(id){
      this.routId = id;
    }
}
