import { TestBed } from '@angular/core/testing';

import { GovernoratesService } from './governorates.service';

describe('GovernoratesService', () => {
  let service: GovernoratesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernoratesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
