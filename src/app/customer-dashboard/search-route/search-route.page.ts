import { Component, OnInit } from '@angular/core';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { serviceProvider } from '../service-provider.model';
import { MenuController, ToastController } from '@ionic/angular';
import { CustomersService } from 'src/app/sdk/custom/customers.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.page.html',
  styleUrls: ['./search-route.page.scss'],
})
export class SearchRoutePage implements OnInit {
  serviceProviderInfo: serviceProvider[];
  oldServiceProviderInfo: serviceProvider[];
  email: string;
  username: string;
  officeLocation: string;
  phone: string;
  public searchTerm: string = "";
  public items: any;
  item: any;
  loading = false;
  skeletonlist = [1, 2, 3, 4, 5];


  constructor(public toastController: ToastController,private customerService:CustomersService,private menu: MenuController,private serviceProvidersService: ServiceProvidersService) { }

  ionViewDidEnter() {
   
    this.menu.enable(true, 'first');
    this.menu.enable(false, 'custom');
    this.menu.enable(false, 'end');
  }
  ngOnInit() {
    this.fillArray();
    // console.log('providers form dashboard = ',this.oldServiceProviderInfo);

    //this.getServiceProvider();
    // this.setFilteredItems(searchTerm);
    // this.fillAtrributes();
  }

 
  saveIdToStroage(id){
    this.customerService.saveProviderIdForProviderProfile(id);
  }


  fillArray() {
    this.loading = true;
    this.serviceProvidersService.getAllServiceProvider().subscribe(
      data => {
          console.log('got response from server', data);
          this.loading = false;
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
      });
    //   this.oldServiceProviderInfo = await this.serviceProvidersService.getAllProviders();
    // console.log('executed');
    // if( this.oldServiceProviderInfo ){
    //   this.serviceProviderInfo = this.oldServiceProviderInfo;}


  }

  setFilteredItems() {
    //if searchbar's value is removed then it will re render the list
    this.serviceProviderInfo = this.oldServiceProviderInfo;
    if (this.searchTerm != "") {
      this.serviceProviderInfo = this.serviceProviderInfo.filter(item => {
        //item.companyName == this.searchTerm;
        return item.companyName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        this.item = item;
        //console.log(item.email);
        return 0;
      });
    }
  }
  async  getServiceProvider() {
    const observable = await this.serviceProvidersService.getAllServiceProvider();
    observable.subscribe(
      data => {
        this.oldServiceProviderInfo = data.data.docs;
        // this.email = this.serviceProviderInfo[3].servicesArray;
        // this.userName = this.serviceProviderInfo.username;
        // this.phone = this.serviceProviderInfo.phone;
        // this.cnic = this.serviceProviderInfo.cnic;
        // this.cities = this.serviceProviderInfo.citiesArray;
        // this.routes = this.serviceProviderInfo.servicesArray;
        //  console.log('service providers = ', this.serviceProviderInfo);
        // console.log('emails = ',this.email);
        this.serviceProviderInfo = this.oldServiceProviderInfo;
      },
      err => {
        console.log('err', err);
      }
    );
  }
  // fillAtrributes(){
  //   for(let i = 0; i < this.serviceProviderInfo.length; i++){
  //     this.email = this.serviceProviderInfo[i].email;
  //     console.log("emails ",this.email);
  //   }
  // }
}
// interface serviceProvider {
//   username: string;
//   email: string;
//   password: string;
//   is_deleted: boolean;
//   phone: string;
//   cnic: string;
//   citiesArray: string[];
//   servicesArray: string[];
//   companyName: string;
//   officeLocation: string;
// }
