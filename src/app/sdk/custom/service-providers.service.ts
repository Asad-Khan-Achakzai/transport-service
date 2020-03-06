import { Injectable } from '@angular/core';
import {Path} from '../server.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NumericValueAccessor } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
// export class Routes{
//   timing :string;
//   totalSeats:number;
//   availableSeats:32;
//   departure:string;
//   destination:string;
// }
export class ServiceProvidersService {
services:[];
observable: any;
serviceProviderInfo:any;
  constructor(private http: HttpClient) { }
  
 public  sendServices(array:[]): void{
this.services = array;
  }
  public getServices(){
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
    return  this.http.post(url, credentials);

  }
  public async getServiceProvider(): Promise<any> {
    const url = Path.getPath() + '/providers/getServiceProvider';
    return this.http.post(url, this.serviceProviderInfo);
  }
}
