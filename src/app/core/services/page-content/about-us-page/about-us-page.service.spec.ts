import { TestBed } from '@angular/core/testing';

import { AboutUsPageService } from './about-us-page.service';

describe('AboutUsPageService', () => {
  let service: AboutUsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutUsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
