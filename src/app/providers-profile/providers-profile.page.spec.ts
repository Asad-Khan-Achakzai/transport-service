import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProvidersProfilePage } from './providers-profile.page';

describe('ProvidersProfilePage', () => {
  let component: ProvidersProfilePage;
  let fixture: ComponentFixture<ProvidersProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvidersProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
