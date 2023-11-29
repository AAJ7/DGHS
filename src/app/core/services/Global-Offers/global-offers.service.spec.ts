import { TestBed } from '@angular/core/testing';

import { GlobalOffersService } from './global-offers.service';

describe('GlobalOffersService', () => {
  let service: GlobalOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
