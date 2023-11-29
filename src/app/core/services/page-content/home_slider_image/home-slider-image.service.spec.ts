import { TestBed } from '@angular/core/testing';

import { HomeSliderImageService } from './home-slider-image.service';

describe('HomeSliderImageService', () => {
  let service: HomeSliderImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSliderImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
