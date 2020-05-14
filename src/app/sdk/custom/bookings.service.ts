import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../server.config';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private authService: AuthService,private http: HttpClient) { }
  public bookingRegister(credentials: object): Observable<any> {
    const url = Path.getPath() + '/bookings/registerBooking';

    return this.http.post(url, credentials);
  }
}

