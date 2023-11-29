import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedQuestionComponent } from './frequently-asked-question.component';

describe('FrequentlyAskedQuestionComponent', () => {
  let component: FrequentlyAskedQuestionComponent;
  let fixture: ComponentFixture<FrequentlyAskedQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequentlyAskedQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
