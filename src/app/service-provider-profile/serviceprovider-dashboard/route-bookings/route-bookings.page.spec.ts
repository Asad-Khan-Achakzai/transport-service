import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteBookingsPage } from './route-bookings.page';

describe('RouteBookingsPage', () => {
  let component: RouteBookingsPage;
  let fixture: ComponentFixture<RouteBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
