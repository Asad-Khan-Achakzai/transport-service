import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomersService} from '../sdk/custom/customers.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.page.html',
  styleUrls: ['./customer-sign-up.page.scss'],
})
export class CustomerSignUpPage implements OnInit {
  Form: FormGroup;
  loading = false;
  img1: any;
  constructor( private router :Router,private formBuilder: FormBuilder,private customerService: CustomersService,private platform: Platform) { }

  ngOnInit() {
    this.formInitializer();}
    formInitializer() {
      this.Form = this.formBuilder.group({
        username: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        cnic: [null, [Validators.required,Validators.maxLength(15),Validators.minLength(13)]],
        email: [null, [Validators.required,Validators.email]],
        password: [null, [Validators.required]],
        phone: [null, [Validators.required,Validators.minLength(12)]],
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
      console.log(file);
    }
    this.platform.is('hybrid')
    {
      
    }
  }
  signUpButton(){
    //this.loading = true;

    this.customerService.userRegister(this.Form.value).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
       // this.router.navigateByUrl('/home');
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
search(){
  console.log("button clicker");
}
}

