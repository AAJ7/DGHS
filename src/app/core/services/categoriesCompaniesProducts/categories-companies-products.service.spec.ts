import { TestBed } from '@angular/core/testing';

import { CategoriesCompaniesProductsService } from './categories-companies-products.service';

describe('CategoriesCompaniesProductsService', () => {
  let service: CategoriesCompaniesProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesCompaniesProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
