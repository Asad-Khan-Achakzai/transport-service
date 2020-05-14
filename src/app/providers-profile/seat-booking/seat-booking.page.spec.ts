import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeatBookingPage } from './seat-booking.page';

describe('SeatBookingPage', () => {
  let component: SeatBookingPage;
  let fixture: ComponentFixture<SeatBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
