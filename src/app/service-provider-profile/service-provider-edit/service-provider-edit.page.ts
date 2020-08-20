import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform, AlertController, MenuController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import { ProviderServicesComponent } from './provider-services/provider-services.component';
import { ServiceProvidersService } from '../../sdk/custom/service-providers.service';
import { MixedService } from '../../sdk/custom/mixed.service';
import { ToastController } from '@ionic/angular';
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
@Component({
  selector: 'app-service-provider-edit',
  templateUrl: './service-provider-edit.page.html',
  styleUrls: ['./service-provider-edit.page.scss'],
})
export class ServiceProviderEditPage implements OnInit {
  Form: FormGroup;
  loading = false;
  //val;
  //val1;
  email;
  vissible =false;
  code;
  verifyLoading = false;
  emailVerified = false;
  disableEmailColumn = true;
  constructor(private menu: MenuController,public alertController: AlertController,public toastController: ToastController,private formBuilder: FormBuilder, private router: Router, private modalController: ModalController, private serviceProviderServices: ServiceProvidersService,private platform: Platform,private mixedService: MixedService) { }
  // cities = ['quetta','peshawer'];
  public skillInput: string = '';
  public cities: any[] = [];
  img1: any;
  ngOnInit() {
    if(!this.serviceProviderServices.serviceProviderData){
      this.router.navigateByUrl('/service-provider-profile');
    }else{
      this.formInitializer();
      this.Form.patchValue(this.serviceProviderServices.serviceProviderData);
      this.cities = this.serviceProviderServices.serviceProviderData.citiesArray;
      this.Form.controls['imageUrl'].setValue(this.serviceProviderServices.serviceProviderData.imageUrl);
      this.Form.controls['password'].setValue(this.serviceProviderServices.serviceProviderPass);
    }
  
  }
  ionViewDidEnter() {
    this.menu.enable(false, 'first');
    this.menu.enable(true, 'custom');
    this.menu.enable(false, 'end');
    if(!this.serviceProviderServices.serviceProviderData){
      this.router.navigateByUrl('/service-provider-profile');
    }else{
      this.formInitializer();
      this.Form.patchValue(this.serviceProviderServices.serviceProviderData);
      this.cities = this.serviceProviderServices.serviceProviderData.citiesArray;
      this.Form.controls['imageUrl'].setValue(this.serviceProviderServices.serviceProviderData.imageUrl);
      this.Form.controls['password'].setValue(this.serviceProviderServices.serviceProviderPass);
    }
  }
  onImagePicked(imageData: string | File) {
    console.log('imageData = ',imageData);
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    console.log('image path = ',imageFile);
    this.Form.patchValue({ image: imageFile });
    
  }
  formInitializer() {
    this.Form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cnic: [null, [Validators.required, Validators.minLength(15)]],
      companyName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      officeLocation: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(12)]],
      skillInput: [null],
      // confirmPassword: [null, [Validators.required]]
      citiesArray: [[]],
      servicesArray: [[]],
      shortID:[],
      imageUrl:[],
      code:[]

    });
  }
  fileChange(event){
    this.platform.is('pwa')
    {
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      let fileList: FileList = event.target.files;  
      let file: File = fileList[0];
      console.log(file);
    }
    this.platform.is('hybrid')
    {
      
    }
  }
  onEnter() {
    this.cities.push(this.Form.value['skillInput'])
    this.Form.controls['skillInput'].setValue('');
  }
  remove(id: number): void {
    this.cities.splice(id, 1);
  }
  upload() {
    console.log(this.cities);
  }

  async openAddModal() {
    this.serviceProviderServices.servicesForEditPage = this.serviceProviderServices.serviceProviderData.servicesArray;
    const modal = await this.modalController.create({
      component: ProviderServicesComponent
    });
    return await modal.present();
  }

  nextButton() {
    this.Form.controls['citiesArray'].setValue(this.cities);
    this.openAddModal();
  }
  async display() {
    console.log('this =',this.serviceProviderServices.servicesForEditPage);
    if(this.serviceProviderServices.servicesForEditPage){
      this.Form.controls['servicesArray'].setValue(this.serviceProviderServices.servicesForEditPage);
    }

    console.log('form =',this.Form.value);
    
      if(this.serviceProviderServices.servicesForEditPage){
        this.loading = true;
        if (this.mixedService.imageURL) {
        this.Form.controls['imageUrl'].setValue(this.mixedService.imageURL);
        this.mixedService.imageURL=null;
      }
 //  this.Form.controls['servicesArray'].setValue(this.serviceProviderServices.getServices());
   //   console.log(this.Form.value);
  
      (
          //  this.Form.controls['servicesArray'].setValue(this.serviceProviderServices.getServices());
          //   console.log(this.Form.value);
          await this.serviceProviderServices.editServiceProvider(this.Form.value)).subscribe(
        async data => {
          console.log('got response from server', data);
          //this.loading = false;
          const toast = await this.toastController.create({
            message: data.message,
           // message: `${name} has been saved successfully.`,
            duration: 3500
          });
          toast.present();
          if(data.message === 'Signup successful'){
            this.router.navigateByUrl('/home');
          }
  
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
        const alert = await this.alertController.create({
          header: 'Alert',
          //subHeader: 'Subtitle',
          message: 'Fill services ',
          buttons: ['OK']
        });
        alert.present();
      }
      
    
    
  }
  sendEmail(){
    this.Form.invalid;
    this.verifyLoading = true;
    this.mixedService.sendEmail({email:this.Form.value['email'],message:'whats up'}).subscribe(
      async data => {
        this.verifyLoading = false;
        console.log('got response from server', data);
    
        const toast = await this.toastController.create({
          message: data.message,
        // message: `${name} has been saved successfully.`,
          duration: 3500
        });
  
        this.code = data.code;
        toast.present();
        if(data.message === 'Email sent successfuly'){
          this.vissible = true;
          this.disableEmailColumn = false;
        }
    
        this.loading = false;
      // this.router.navigateByUrl('/home');
      },
      async error => {
        this.loading = false;
        const toast = await this.toastController.create({
          message: error.error.message,
        // message: `${name} has been saved successfully.`,
          duration: 3500
        });
       
      }
    );
      }
      async verifyCode(){
        if(this.code ===this.Form.value['code'] ){
          this.emailVerified = true;
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
}