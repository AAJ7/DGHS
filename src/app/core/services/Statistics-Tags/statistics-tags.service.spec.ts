import { TestBed } from '@angular/core/testing';

import { StatisticsTagsService } from './statistics-tags.service';

describe('StatisticsTagsService', () => {
  let service: StatisticsTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
