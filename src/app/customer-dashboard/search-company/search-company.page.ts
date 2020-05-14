import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceProvidersService } from 'src/app/sdk/custom/service-providers.service';
import { serviceProvider } from '../service-provider.model';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.page.html',
  styleUrls: ['./search-company.page.scss'],
})
export class SearchCompanyPage implements OnInit {
  Form: FormGroup;
  serviceProviderInfo: serviceProvider[];
  oldServiceProviderInfo: serviceProvider[];
  // departs = 's';
  // dests = 'd';
  constructor(private formBuilder: FormBuilder, private serviceProvidersService: ServiceProvidersService) { }

  ngOnInit() {
    this.formInitializer();
    this.fillArray();
  }
  public optionsFn(): void { //here item is an object 
  }
  formInitializer() {
    this.Form = this.formBuilder.group({
      departureValue: [null, [Validators.required]],
      destinationValue: [null, [Validators.required]]
    });
  }
  searchButton() {
    let departs = this.Form.value['departureValue'];
    let dests = this.Form.value['destinationValue'];
    let obj;
     console.log('searched value = ', departs);
     console.log('searched value = ', dests);
    this.serviceProviderInfo = this.oldServiceProviderInfo;
    for(let i =0 ;i< this.oldServiceProviderInfo.length;i++){
      for(let j = 0; j<this.oldServiceProviderInfo[i].servicesArray.length;j++  ){
        if(departs === this.oldServiceProviderInfo[i].servicesArray[j].departure && this.oldServiceProviderInfo[i].servicesArray[j].destination === dests)
        {this.serviceProviderInfo = [];
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
    this.serviceProvidersService.getAllServiceProvider().subscribe(
      data => {
        //  console.log('got response from server', data);
        this.oldServiceProviderInfo = data.data.docs;
        this.serviceProviderInfo = this.oldServiceProviderInfo;
        this.serviceProvidersService.filloldServiceProviderInfo(this.serviceProviderInfo);
      },
      async error => {
        // this.loading = false;
        console.log('error');
      });
    //   this.oldServiceProviderInfo = await this.serviceProvidersService.getAllProviders();
    // console.log('executed');
    // if( this.oldServiceProviderInfo ){
    //   this.serviceProviderInfo = this.oldServiceProviderInfo;}


  }
}
