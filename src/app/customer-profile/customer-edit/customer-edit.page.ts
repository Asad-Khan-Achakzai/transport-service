import { Platform, AlertController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import {CustomersService} from '../../sdk/custom/customers.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MixedService } from '../../sdk/custom/mixed.service';
import { ToastController } from '@ionic/angular';
//import { SMS } from '@ionic-native/sms/ngx';
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
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.page.html',
  styleUrls: ['./customer-edit.page.scss'],
})
export class CustomerEditPage implements OnInit {

  Form: FormGroup;
  loading = false;
  img1: any;
  email;
  vissible =false;
  verifyLoading = false;
  emailVerified = false;
  disableEmailColumn = true;
  code;
  constructor(private menu: MenuController,public toastController: ToastController, private router :Router,private formBuilder: FormBuilder,private customerService: CustomersService,private platform: Platform,private mixedService: MixedService, public alertController: AlertController) { }

  async ngOnInit() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    
    if(!this.customerService.customerData){
      this.router.navigateByUrl('/customer-profile');
    }
  else{
    this.formInitializer();
    
  console.log('customer =',this.customerService.customerData);
  this.Form.patchValue(this.customerService.customerData);
  this.Form.controls['imageUrl'].setValue(this.customerService.logedInCustomerImage_url);
  this.Form.controls['password'].setValue(this.customerService.customerPassword); 
  }
  //this.Form.setValue['password']=this.customerService.customerPassword;
  }
  ionViewDidEnter() {
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
    if(!this.customerService.customerData){
      this.router.navigateByUrl('/customer-profile');
    }
  else{
    this.formInitializer();
    
  console.log('customer =',this.customerService.customerData);
  this.Form.patchValue(this.customerService.customerData);
  this.Form.controls['imageUrl'].setValue(this.customerService.logedInCustomerImage_url);
  this.Form.controls['password'].setValue(this.customerService.customerPassword); 
  console.log('form value = ',this.Form.value);
  }
  }
    
  onImagePicked(imageData: string | File) {
    //console.log('imageData = ',imageData);
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
        cnic: [null, [Validators.required,Validators.maxLength(15),Validators.minLength(13)]],
        email: [null, [Validators.required,Validators.email]],
        password: [null],
        phone: [null, [Validators.required,Validators.minLength(12)]],
        image: new FormControl(null),
        shortID:[],
        imageUrl:[],
        code:[]
        //confirmPassword: [null, [Validators.required]],
      });
  }
  back(){
    this.router.navigateByUrl('/home');
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
      //console.log(file);
    }
    this.platform.is('hybrid')
    {
      
    }
  }
  async signUpButton(){
   // 
           console.log('form value = ',this.Form.value);
    if (this.mixedService.imageURL) {
      this.loading = true;
      this.Form.controls['imageUrl'].setValue(this.mixedService.imageURL);
      this.mixedService.imageURL=null;

    }
      
       console.log('form value = ',this.Form);
      this.customerService.udpateUser(this.Form.value).subscribe(
        async data => {
          
          console.log('got response from server', data);

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
