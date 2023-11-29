import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryManagerCountryComponent } from './country-manager-country.component';

describe('CountryManagerCountryComponent', () => {
  let component: CountryManagerCountryComponent;
  let fixture: ComponentFixture<CountryManagerCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryManagerCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryManagerCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
