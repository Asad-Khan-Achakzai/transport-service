import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutesTabPage } from './routes-tab.page';

describe('RoutesTabPage', () => {
  let component: RoutesTabPage;
  let fixture: ComponentFixture<RoutesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
