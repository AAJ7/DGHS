import { TestBed } from '@angular/core/testing';

import { CountryManagerTransportationPeriodService } from './country-manager-transportation-period.service';

describe('CountryManagerTransportationPeriodService', () => {
  let service: CountryManagerTransportationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryManagerTransportationPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
