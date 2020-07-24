import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingCartPage } from './booking-cart.page';

describe('BookingCartPage', () => {
  let component: BookingCartPage;
  let fixture: ComponentFixture<BookingCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
