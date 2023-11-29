import { TestBed } from '@angular/core/testing';

import { AssignedDriversService } from './assigned-drivers.service';

describe('AssignedDriversService', () => {
  let service: AssignedDriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedDriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
