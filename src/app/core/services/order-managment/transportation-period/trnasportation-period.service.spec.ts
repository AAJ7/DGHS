import { TestBed } from '@angular/core/testing';

import { TrnasportationPeriodService } from './trnasportation-period.service';

describe('TrnasportationPeriodService', () => {
  let service: TrnasportationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnasportationPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
