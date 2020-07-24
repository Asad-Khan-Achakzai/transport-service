import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualBookingPage } from './manual-booking.page';

describe('ManualBookingPage', () => {
  let component: ManualBookingPage;
  let fixture: ComponentFixture<ManualBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
