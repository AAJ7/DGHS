import { TestBed } from '@angular/core/testing';

import { PromoCodeOffersService } from './promo-code-offers.service';

describe('PromoCodeOffersService', () => {
  let service: PromoCodeOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodeOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
