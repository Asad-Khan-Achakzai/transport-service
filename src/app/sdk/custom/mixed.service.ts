import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MixedService {
  imageURL:string;
  constructor() { }
  user;
  public async getUser(): Promise<any> {
if(this.user !== ''){
    return this.user;}
  }
}
