import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderRedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate() {
    const token = await this.authService.getTokenFromStorage();
    if (token) {
      this.router.navigateByUrl('/service-provider-profile');
    } else {
      return true;
    }
  }
}
