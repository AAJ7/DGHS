import { TestBed } from '@angular/core/testing';

import { DeliveryTypesService } from './delivery-types.service';

describe('DeliveryTypesService', () => {
  let service: DeliveryTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
