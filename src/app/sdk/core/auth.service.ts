import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage, private router: Router) {}
public saveServiceProviderId(id:string){
  this.storage.set('serviceProviderId',id);
}
public async getServiceProviderId(){
  const id = await this.storage.get('serviceProviderId');
  return id;
}
  public saveTokenToStorage(token: string) {
    //save token to storage
    this.storage.set('token', token);
    
  }

  public async getTokenFromStorage() {
     
    const token = await this.storage.get('token');
    return token;
  }
  public async logout() {
    this.storage.clear();
    this.router.navigateByUrl('/home');
  }
}
