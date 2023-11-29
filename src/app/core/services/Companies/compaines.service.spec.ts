import { TestBed } from '@angular/core/testing';

import { CompainesService } from './compaines.service';

describe('CompainesService', () => {
  let service: CompainesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompainesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
