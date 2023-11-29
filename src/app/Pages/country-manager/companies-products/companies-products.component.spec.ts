import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesProductsComponent } from './companies-products.component';

describe('CompaniesProductsComponent', () => {
  let component: CompaniesProductsComponent;
  let fixture: ComponentFixture<CompaniesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
