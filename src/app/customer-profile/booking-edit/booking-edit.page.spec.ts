import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingEditPage } from './booking-edit.page';

describe('BookingEditPage', () => {
  let component: BookingEditPage;
  let fixture: ComponentFixture<BookingEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
