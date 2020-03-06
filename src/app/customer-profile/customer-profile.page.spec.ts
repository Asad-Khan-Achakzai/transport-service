import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerProfilePage } from './customer-profile.page';

describe('CustomerProfilePage', () => {
  let component: CustomerProfilePage;
  let fixture: ComponentFixture<CustomerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
