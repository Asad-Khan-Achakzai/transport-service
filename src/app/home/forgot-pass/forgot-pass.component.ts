import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/sdk/core/auth.service';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/sdk/custom/customers.service';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { MixedService } from 'src/app/sdk/custom/mixed.service';
import { serviceProvider } from 'src/app/customer-dashboard/service-provider.model';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
  email;
  loading = false;
  vissible = false;
  code;
  user;
  password;
  customerBody:customer;
  serviceProviderBody:serviceProvider;
  serverCode;
  emailVerified = false;
  sendCodeButton = true;
  verifyCodeButton = true;
  conformPassword;

  constructor(private mixedService:MixedService, private modalController: ModalController, private menu: MenuController,public toastController: ToastController,private authService: AuthService, private router: Router, public alertController: AlertController, private customerService: CustomersService,private serviceProvidersService: ServiceProvidersService) {}

  ngOnInit() {}
  sendEmail(){
    this.loading = true;
console.log('email =',this.email);
this.mixedService.sendPassword({email:this.email,message:'whats up'}).subscribe(
  async data => {
    this.loading = false;
    console.log('got response from server', data);
    this.user = data.user;
    this.serverCode = data.code;
    if(this.user==='customer'){
      this.customerBody = data.body;

    }
    else if(this.user === 'serviceProvider'){
      this.serviceProviderBody = data.body;
    }
    else{
      console.log('code expired')
    }

    const toast = await this.toastController.create({
      message: data.message,
    // message: `${name} has been saved successfully.`,
      duration: 3500
    });
    toast.present();
    if(data.message === 'Email sent successfuly'){
      this.vissible = true;
      this.sendCodeButton = false;
    }

    this.loading = false;
  // this.router.navigateByUrl('/home');
  },
  async error => {
    this.loading = false;
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Subtitle',
      message: error.error.message,
      buttons: ['OK']
    });
    alert.present();
  }
);
  }
  async verifyCode(){
    if(this.code ===this.serverCode ){
      this.emailVerified = true;
      this.verifyCodeButton = false;
      const toast = await this.toastController.create({
        message: 'Email verified',
      // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }
    else{
      const toast = await this.toastController.create({
        message: 'Invalid code',
      // message: `${name} has been saved successfully.`,
        duration: 3500
      });
      toast.present();
    }

  }
  async changePassword(){
    this.loading = true;
    if(this.user === 'customer'){
      this.customerBody.password = this.password;
      this.mixedService.udpateUser(this.customerBody._id,this.customerBody).subscribe(
        async data => {
          
          console.log('got response from server', data);

          const toast = await this.toastController.create({
            message: data.message,
           // message: `${name} has been saved successfully.`,
            duration: 3500
          });
          toast.present();
             this.router.navigateByUrl('/home');
         

          this.loading = false;
         // this.router.navigateByUrl('/home');
        },
        async error => {
          this.loading = false;
          const alert = await this.alertController.create({
            header: 'Alert',
            //subHeader: 'Subtitle',
            message: error.error.message,
            buttons: ['OK']
          });
          alert.present();
        }
      );

  }else if(this.user === 'serviceProvider'){
    this.serviceProviderBody.password = this.password;
    let observable = await this.mixedService.editServiceProvider(this.serviceProviderBody._id,this.serviceProviderBody);
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        //this.loading = false;
        const toast = await this.toastController.create({
          message: data.message,
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
        // if(data.message === 'Signup successful'){
        //   this.router.navigateByUrl('/home');
        // }

        this.loading = false;
      },
      async error => {
        this.loading = false;
        console.log('error', error);
        const alert = await this.alertController.create({
          header: 'Alert',
          //subHeader: 'Subtitle',
          message: error.error.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );

  }
  else{
    console.log('Code expired try again')
  }
}

}
interface customer {
  shortID:string;
  _id: string;
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  phone: string;
  cnic: string;
  imageUrl:string;
  
}