import { TestBed } from '@angular/core/testing';

import { HaveSubCategoriesService } from './have-sub-categories.service';

describe('HaveSubCategoriesService', () => {
  let service: HaveSubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaveSubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
