import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './sdk/core/httpinterceptor.service';
import { NgIoModule, NgIoConfig } from 'ng-io';
import { DatePipe } from '@angular/common'
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
const config: NgIoConfig = { url: 'https://socket-server-appp.herokuapp.com', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,
    IonicModule.forRoot({menuType: 'overlay'}),
    IonicStorageModule.forRoot(),
    AppRoutingModule, NgIoModule.forRoot(config),
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileOpener
   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
