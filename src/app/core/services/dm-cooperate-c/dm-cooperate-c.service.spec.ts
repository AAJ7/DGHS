import { TestBed } from '@angular/core/testing';

import { DmCooperateCService } from './dm-cooperate-c.service';

describe('DmCooperateCService', () => {
  let service: DmCooperateCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmCooperateCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
