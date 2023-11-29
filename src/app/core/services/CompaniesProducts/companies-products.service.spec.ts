import { TestBed } from '@angular/core/testing';

import { CompaniesProductsService } from './companies-products.service';

describe('CompaniesProductsService', () => {
  let service: CompaniesProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
