import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { serviceProvider } from '../service-provider.model';
import { MenuController, ToastController } from '@ionic/angular';
import { CustomersService } from 'src/app/sdk/custom/customers.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.page.html',
  styleUrls: ['./search-company.page.scss'],
})
export class SearchCompanyPage implements OnInit {
  Form: FormGroup;
  serviceProviderInfo: serviceProvider[];
  oldServiceProviderInfo: serviceProvider[];
  loading = false;
  skeletonlist = [1, 2, 3, 4, 5];
  // departs = 's';
  // dests = 'd';
  constructor(private customerService:CustomersService,public toastController: ToastController,private menu: MenuController,private formBuilder: FormBuilder, private serviceProvidersService: ServiceProvidersService) { }
  async refreshPage(event) { 
    
    this.loading = true;
  
   this.fillArray();
   setTimeout(() => {
     event.target.complete();
   }, 1000);
  } 
  ngOnInit() {
    this.formInitializer();
    this.fillArray();
  }
  displayToast(){
    this.customerService.showToast('Navigating....');
  }
  ionViewDidEnter() {
   
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
  }   
  public optionsFn(): void { //here item is an object 
  }
  formInitializer() {
    this.Form = this.formBuilder.group({
      departureValue: [null, [Validators.required]],
      destinationValue: [null, [Validators.required]]
    });
  }
  clear(){
    this.serviceProviderInfo = this.oldServiceProviderInfo;
    this.Form.controls['departureValue'].setValue('');
    this.Form.controls['destinationValue'].setValue('');
    //this.Form.setValue['departureValue'] = '';
    //this.Form.setValue['destinationValue'] = '';
  }
  searchButton() {
    let departs = this.Form.value['departureValue'];
    let dests = this.Form.value['destinationValue'];
    let obj;
     console.log('searched value = ', departs);
     console.log('searched value = ', dests);
     this.serviceProviderInfo = [];
    for(let i =0 ;i< this.oldServiceProviderInfo.length;i++){
      for(let j = 0; j<this.oldServiceProviderInfo[i].servicesArray.length;j++  ){
        if(departs === this.oldServiceProviderInfo[i].servicesArray[j].departure && this.oldServiceProviderInfo[i].servicesArray[j].destination === dests)
        {         
           console.log('came = ',this.oldServiceProviderInfo[i]);
    //    this.serviceProviderInfo.splice(0, this.serviceProviderInfo.length);

         
          console.log('came = ',this.serviceProviderInfo);
          this.serviceProviderInfo.push(this.oldServiceProviderInfo[i]);
        }
      }
    }
    //  this.serviceProviderInfo = this.serviceProviderInfo.filter(function (item) { 
    //    item.servicesArray.filter((routs)=>{
    //      if(departs === routs.departure && routs.destination === dests)
    //      {
    //       console.log('found = ', item)
    //        return item;
    //        return 0;
           
    //      }
         
    //    });

      
    //  }); 
    //  console.log('inf = ', this.serviceProviderInfo)

    }
  //   this.serviceProviderInfo = this.serviceProviderInfo.filter(function (item) {
  //     //item.companyName == this.searchTerm;
  //     if (item.servicesArray.filter((routes) => {
  //       if (depart === routes.departure && dest === routes.destination) {
  //         console.log('found = ', item)
  //         obj = item;
  //         return item;
  //       }
  //     }))   {}  //this.item = item;
  //       //console.log(item.email);
     
  //   });
  
  //   console.log('inf = ', this.serviceProviderInfo)
  //   return 0;
  // }

  fillArray() {
    this.loading = true;
    this.serviceProvidersService.getAllServiceProvider().subscribe(
      data => {
        //  console.log('got response from server', data);
        this.loading = false;
        console.log('all serviceProviders =',this.oldServiceProviderInfo);
        this.oldServiceProviderInfo = data.data.docs;
        this.serviceProviderInfo = this.oldServiceProviderInfo;
        this.serviceProvidersService.filloldServiceProviderInfo(this.serviceProviderInfo);
      },
      async error => {
         this.loading = false;
         const toast = await this.toastController.create({
          message: error.error.message,
         // message: `${name} has been saved successfully.`,
          duration: 3500
        });
        toast.present();
        console.log('error');
      });
    //   this.oldServiceProviderInfo = await this.serviceProvidersService.getAllProviders();
    // console.log('executed');
    // if( this.oldServiceProviderInfo ){
    //   this.serviceProviderInfo = this.oldServiceProviderInfo;}


  }
}
