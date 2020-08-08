
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../sdk/custom/customers.service';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';
import { AlertController, ToastController, MenuController, ModalController } from '@ionic/angular';
import { AuthService } from '../sdk/core/auth.service';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading = false;
  Form: FormGroup;
  constructor(    private modalController: ModalController, private menu: MenuController,public toastController: ToastController,private authService: AuthService, private router: Router, private formBuilder: FormBuilder, public alertController: AlertController, private customerService: CustomersService,private serviceProvidersService: ServiceProvidersService) {
    this.menu.enable(false, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
   }
  ngOnInit() {
    this.formInitializer();
  }
  async forgotPass(){
    console.log('clicked');
    const modal = await this.modalController.create({
      component: ForgotPassComponent
    });
    return await modal.present();
  }
  formInitializer() {
    this.Form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      slectedGender: [null, [Validators.required]]
    });
  }
  // ionViewDidEnter() {
  //   this.Form.controls['email'].setValue('');
  //   this.Form.controls['password'].setValue('');
  //   this.Form.controls['slectedGender'].setValue('');
  

  // }
  ionViewWillEnter(){
    this.formInitializer();
    this.menu.enable(false, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
  }
  async signUp() {
    if(this.Form.value['slectedGender'] === null){
      const alert = await this.alertController.create({
        header: 'Alert',
        //subHeader: 'Subtitle',
        message: 'please select user type',
        buttons: ['OK']
      });
      alert.present();
    }
    if (this.Form.value['slectedGender'] === "customer") {
      this.router.navigateByUrl('/customer-sign-up');
    }
    if (this.Form.value['slectedGender'] === "serviceProvider") {
      this.router.navigateByUrl('/service-provider-signup');
    }

  }
  public optionsFn(): void { //here item is an object 
    console.log(this.Form.value['slectedGender']);
  }
  loginButton() {
    // if (this.Form.value['slectedGender'] === "customer") {
    //   this.router.navigateByUrl('/customer-profile');
    // }
    this.loading = true;
    const loginData = this.Form.value;
    if (this.Form.value['slectedGender'] === "customer") {
      this.customerService.customerLogin(loginData).subscribe(
        async data => {
          this.customerService.saveCustomerId(data.id);
          console.log('got response from server', data);
          this.authService.saveTokenToStorage(data.token);
         this.loading = false;
         const toast = await this.toastController.create({
          message: data.message,
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
          this.router.navigateByUrl('/customer-profile');
        },
        async error => {
          // this.loading = false;
          const toast = await this.toastController.create({
            message: error.error.message,
           // message: `${name} has been saved successfully.`,
            duration: 3500
          });
          toast.present();
          this.loading = false;
          //this.books.addBook(this.nameText, this.authorText);

          console.log('error', error.error.message);
        });
    }
    else {
      console.log('loginData', loginData);
      this.serviceProvidersService.serviceProviderLogin(loginData).subscribe(
        async data => {
          this.serviceProvidersService.saveServiceProviderId(data.id);
          console.log('got response from server', data);
          this.authService.saveTokenToStorage(data.token);
          this.loading = false;
         const toast = await this.toastController.create({
          message: data.message,
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
          this.router.navigateByUrl('/service-provider-profile');
        },
        async error => {
          // this.loading = false;
          const toast = await this.toastController.create({
            message: error.error.message,
           // message: `${name} has been saved successfully.`,
            duration: 3500
          });
          toast.present();
          this.loading = false;
          // const alert = await this.alertController.create({
          //   header: 'Alert',
          //   //subHeader: 'Subtitle',
          //   message: error.error.message,
          //   buttons: ['OK']
          // });
          // alert.present();



        });
    }
  }
}

  // loginButton(){
  //   const loginData = this.Form.value;
  //    if(this.Form.value['slectedGender'] === "customer"){

  //     console.log('loginData', loginData);
  //   this.customerService.customerLogin(loginData).subscribe(
  //     data => {
  //       console.log('got response from server', data);
  //      this.router.navigateByUrl('/customer-profile');
  //     },
  //      async error => {
  //      // this.loading = false;
  //      const alert = await this.alertController.create({
  //       header: 'Alert',
  //       //subHeader: 'Subtitle',
  //       message: error.error.message,
  //       buttons: ['OK']
  //     });
  //       alert.present();
  //       //this.books.addBook(this.nameText, this.authorText);

  //       console.log('error', error.error.message);
  //     } );}
  //     else{
  //       console.log('loginData', loginData);
  //       this.customerService.serviceProviderLogin(loginData).subscribe(
  //         data => {
  //           console.log('got response from server', data);
  //          this.router.navigateByUrl('/serviceprovider-profile');
  //         },
  //         async error => {
  //          // this.loading = false;

  //          const alert = await this.alertController.create({
  //           header: 'Alert',
  //           //subHeader: 'Subtitle',
  //           message: error.error.message,
  //           buttons: ['OK']
  //         });
  //           alert.present();



  //         } );
  //     }
  //    }


