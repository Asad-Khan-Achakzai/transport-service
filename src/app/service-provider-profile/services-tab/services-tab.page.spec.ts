import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesTabPage } from './services-tab.page';

describe('ServicesTabPage', () => {
  let component: ServicesTabPage;
  let fixture: ComponentFixture<ServicesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
