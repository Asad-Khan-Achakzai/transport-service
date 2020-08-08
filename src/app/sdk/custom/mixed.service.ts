import { Injectable } from '@angular/core';
import {Path} from '../server.config';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MixedService {
  imageURL:string;
  constructor(public toastController: ToastController,mixedService:MixedService,private authService: AuthService,private http: HttpClient) { }
  user;
  public async getUser(): Promise<any> {
if(this.user !== ''){
    return this.user;}
  }
  public sendEmail(credentials: object): Observable<any> {
    const url = Path.getPath() + '/admins/sendEmail';

    return this.http.post(url, credentials);
  }
  public sendPassword(credentials: object): Observable<any> {
    const url = Path.getPath() + '/admins/sendPassword';

    return this.http.post(url, credentials);
  }
  public udpateUser(logedInCustomerId,credentials: object): Observable<any> {
    const url = Path.getPath() + `/users/${logedInCustomerId}`;

    return this.http.put(url, credentials);
  }
  public async editServiceProvider(id,credentials: object): Promise<Observable<any>> {
    
    const url = Path.getPath() + `/providers/${id}`;

    return this.http.put(url, credentials);
  }
}
