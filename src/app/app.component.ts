import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CustomersService } from './sdk/custom/customers.service';
import { ServiceProvidersService } from './sdk/custom/service-providers.service';
import { MixedService } from './sdk/custom/mixed.service';
import { AuthService } from './sdk/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  labels= ['facebook','google'];
  customerImg;
  serviceProviderImg;
  public selectedIndex = 0;
  constructor(
    public authService:AuthService,
    private serviceProvidersService: ServiceProvidersService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController, 
    private customerService: CustomersService
  ) {
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   console.log('Handler was called!');
    //  // this.router.navigateByUrl('/customer-dashboard')
    // });
    this.initializeApp();
    this.customerService.getObservable().subscribe((data) => {
      console.log("Data received:", data);
      this.customerImg = data.customerImg;
     
    })
    this.serviceProvidersService.getObservable().subscribe((data) => {
      console.log("Data received:", data);
      this.serviceProviderImg = data.serviceProviderImage;
      // this.reviewerService.getReviewer(data.userId).snapshotChanges().subscribe(res => {
      //   this.userProfile = res.payload.toJSON();
      // });
    })
  
  this.loadImg();
  

  }
  ngOnInit() {
    this.initializeApp();
    this.loadImg();
  }
  logOut(){
    this.authService.logout();
  }
  
  // async getUser(){
    
  //   const observable = await this.mixedService.getUser(); 


  //   observable.subscribe(
  //     data => {
  //       console.log('userss = ',data);
  //     });
  // }
  async loadImg(){
    console.log('in mnu');
    this.serviceProviderImg = await this.serviceProvidersService.getServiceProviderImg();
    this.customerImg = await this.customerService.getCustomerImg();
    console.log('customer img =',this.customerImg);

  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  // openEnd() {
  //   this.menu.open('end');
  // }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  
  currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'Profile',
      url: '/customer-profile',
      icon: 'person'
    },
    {
      title: 'Dashboard',
      url: '/customer-dashboard',
      icon: 'easel'
    },
    {
      title: 'Bookings',
      url: '/customer-profile/booking-cart',
      icon: 'cart'
    }, 
    {
      title: 'Settings',
      url: '//customer-profile/customer-edit',
      icon: 'settings'
    }
  ];
  serviceProviderPages = [
    {
      title: 'Dashboard',
      url: '/service-provider-profile/serviceprovider-dashboard',
      icon: 'easel'
    },
    {
      title: 'Profile',
      url: '/service-provider-profile',
      icon: 'person'
    },
    {
      title: 'Settings',
      url: '/service-provider-profile/service-provider-edit',
      icon: 'settings'
    }
  ];
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}
