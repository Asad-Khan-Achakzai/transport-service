import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage, private router: Router) {}

  public saveTokenToStorage(token: string) {
    this.storage.set('token', token);
    console.log('token saved in the storage');
  }

  public async getTokenFromStorage() {
     
    const token = await this.storage.get('token');
    console.log('token found = ',token);
    return token;
  }
  public async logout() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }
}
