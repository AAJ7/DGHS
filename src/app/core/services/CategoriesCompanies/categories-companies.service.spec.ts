import { TestBed } from '@angular/core/testing';

import { CategoriesCompaniesService } from './categories-companies.service';

describe('CategoriesCompaniesService', () => {
  let service: CategoriesCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
