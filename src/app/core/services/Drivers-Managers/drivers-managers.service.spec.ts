import { TestBed } from '@angular/core/testing';

import { DriversManagersService } from './drivers-managers.service';

describe('DriversManagersService', () => {
  let service: DriversManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriversManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
