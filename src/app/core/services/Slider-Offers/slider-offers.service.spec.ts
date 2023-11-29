import { TestBed } from '@angular/core/testing';

import { SliderOffersService } from './slider-offers.service';

describe('SliderOffersService', () => {
  let service: SliderOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
