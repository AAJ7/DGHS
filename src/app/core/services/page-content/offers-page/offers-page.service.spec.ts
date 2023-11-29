import { TestBed } from '@angular/core/testing';

import { OffersPageService } from './offers-page.service';

describe('OffersPageService', () => {
  let service: OffersPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
