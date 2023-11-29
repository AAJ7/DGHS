import { TestBed } from '@angular/core/testing';

import { ClientsLocationsService } from './clients-locations.service';

describe('ClientsLocationsService', () => {
  let service: ClientsLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
