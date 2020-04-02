export interface serviceProvider {
    _id: string;
    username: string;
    email: string;
    password: string;
    is_deleted: boolean;
    phone: string;
    cnic: string;
    citiesArray: string[];
    servicesArray: string[];
    companyName: string;
    officeLocation: string;
  }