import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchCompanyPage } from './search-company.page';

describe('SearchCompanyPage', () => {
  let component: SearchCompanyPage;
  let fixture: ComponentFixture<SearchCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
