import { TestBed } from '@angular/core/testing';

import { DriversAppOrdersService } from './drivers-app-orders.service';

describe('DriversAppOrdersService', () => {
  let service: DriversAppOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriversAppOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
