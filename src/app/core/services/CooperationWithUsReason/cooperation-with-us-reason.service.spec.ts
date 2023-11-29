import { TestBed } from '@angular/core/testing';

import { CooperationWithUsReasonService } from './cooperation-with-us-reason.service';

describe('CooperationWithUsReasonService', () => {
  let service: CooperationWithUsReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperationWithUsReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
