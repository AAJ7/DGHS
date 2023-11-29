import { TestBed } from '@angular/core/testing';

import { CountryManagersService } from './country-managers.service';

describe('CountryManagersService', () => {
  let service: CountryManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
