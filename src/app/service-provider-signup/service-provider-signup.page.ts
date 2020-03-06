import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
//import {CustomerService} from '../../sdk/custom/customer.service';
import { ProviderServicesComponent } from './provider-services/provider-services.component';
import { ServiceProvidersService } from '../sdk/custom/service-providers.service';

@Component({
  selector: 'app-service-provider-signup',
  templateUrl: './service-provider-signup.page.html',
  styleUrls: ['./service-provider-signup.page.scss'],
})
export class ServiceProviderSignupPage implements OnInit {
  Form: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private modalController: ModalController, private serviceProviderServices: ServiceProvidersService) { }
  // cities = ['quetta','peshawer'];
  public skillInput: string = '';
  public cities: any[] = [];
  ngOnInit() {
    this.formInitializer();
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
      servicesArray: [[]]

    });
  }
  onEnter(value) {
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
    const modal = await this.modalController.create({
      component: ProviderServicesComponent
    });
    return await modal.present();
  }

  nextButton() {
    this.Form.controls['citiesArray'].setValue(this.cities);
    this.openAddModal();
  }
  display() {
    this.Form.controls['servicesArray'].setValue(this.serviceProviderServices.getServices());
    console.log(this.Form.value);

    this.serviceProviderServices.serviceProviderRegister(this.Form.value).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }
  // upload(form) {
  //   console.log(this.Form.value);
  // }
  // back(){
  //   this.router.navigateByUrl('/home');
  // }
  // tagArrayToString(tagArray: string[]): string {
  //   if (Array.isArray(tagArray) && tagArray.length > 0) {
  //     const tags = tagArray.map((e: any) => `[${e.value}]`);
  //     const tagString = tags.join();
  //     return tagString;
  //   } else {
  //     return '';
  //   }
  // }
  //  this.customerService.provideServices(this.Form.value);
  //   this.router.navigateByUrl('/service-provider-services');
  // }
}

