import { TestBed } from '@angular/core/testing';

import { FrequentlyAskedQuestionService } from './frequently-asked-question.service';

describe('FrequentlyAskedQuestionService', () => {
  let service: FrequentlyAskedQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequentlyAskedQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
