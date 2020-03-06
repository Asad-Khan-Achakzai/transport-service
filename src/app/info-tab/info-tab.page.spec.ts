import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoTabPage } from './info-tab.page';

describe('InfoTabPage', () => {
  let component: InfoTabPage;
  let fixture: ComponentFixture<InfoTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
