import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate() {
    //const token = await this.authService.getTokenFromStorage();
    if (!await this.authService.getTokenFromStorage()) {
      console.log('token not found');
      this.router.navigateByUrl('/home');
    } else {
      return true;
    }
  }
}
