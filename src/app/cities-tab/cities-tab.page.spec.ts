import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitiesTabPage } from './cities-tab.page';

describe('CitiesTabPage', () => {
  let component: CitiesTabPage;
  let fixture: ComponentFixture<CitiesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
