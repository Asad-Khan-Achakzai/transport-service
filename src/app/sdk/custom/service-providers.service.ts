import { Injectable } from '@angular/core';
import { Path } from '../server.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumericValueAccessor } from '@ionic/angular';
import { serviceProvider } from '../../customer-dashboard/service-provider.model';
export class Routes {
  timing: string;
  totalSeats: number;
  availableSeats: number;
  departure: string;
  destination: string;

}
@Injectable({
  providedIn: 'root'
})

export class ServiceProvidersService {
  serviceProviderNameInbox:string;
  serviceProviderIdInbox:string;
  services: Routes[];
  observable: any;
  serviceProviderInfo: any;
  logedInServiceProvider:serviceProvider;
  routes: Routes[];

  oldServiceProviderInfo: serviceProvider[];
  constructor(private http: HttpClient) {
    this.routes = [new Routes()];
  }

  public sendServices(array2: Routes[]): void {
    console.log(array2);
    this.services = array2;
  }
  public getServices() {
    return this.services;
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
  public async getServiceProvider(): Promise<any> {
    const url = Path.getPath() + '/providers/getServiceProvider';
    return this.http.post(url, this.serviceProviderInfo);
  }
  public getAllServiceProvider(): Observable<any> {

    // this url will be http://localhost:3000/providers/login
    const url = Path.getPath() + '/providers/getAllServiceProviders';
    // this.observable = this.http.get(url);
    // this.observable.subscribe(
    //   data => {
    //   });
    return this.http.get(url);

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


      getServiceProviderName(){
        console.log('getServiceProviderName',this.serviceProviderNameInbox);
        return this.serviceProviderNameInbox;
          }
}
