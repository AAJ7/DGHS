import { TestBed } from '@angular/core/testing';

import { OrderStepsService } from './order-steps.service';

describe('OrderStepsService', () => {
  let service: OrderStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
