import { TestBed } from '@angular/core/testing';

import { CountryManagersProductsService } from './country-managers-products.service';

describe('CountryManagersProductsService', () => {
  let service: CountryManagersProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryManagersProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
