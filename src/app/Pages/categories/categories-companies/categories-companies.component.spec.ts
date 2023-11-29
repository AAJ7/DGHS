import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCompaniesComponent } from './categories-companies.component';

describe('CategoriesCompaniesComponent', () => {
  let component: CategoriesCompaniesComponent;
  let fixture: ComponentFixture<CategoriesCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
