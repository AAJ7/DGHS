import { TestBed } from '@angular/core/testing';

import { OrderRatesService } from './order-rates.service';

describe('OrderRatesService', () => {
  let service: OrderRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
