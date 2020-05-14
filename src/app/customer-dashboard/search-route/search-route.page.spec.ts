import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchRoutePage } from './search-route.page';

describe('SearchRoutePage', () => {
  let component: SearchRoutePage;
  let fixture: ComponentFixture<SearchRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRoutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
