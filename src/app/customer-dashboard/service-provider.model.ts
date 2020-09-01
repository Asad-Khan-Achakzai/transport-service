import { Routes } from '../sdk/custom/service-providers.service';

export interface serviceProvider {
    _id: string;
    shortID:string;
    username: string;
    email: string;
    password: string;
    is_deleted: boolean;
    phone: string;
    cnic: string;
    citiesArray: string[];
    servicesArray: Routes[];
    companyName: string;
    officeLocation: string;
    imageUrl:string;
    rank:number;
  }