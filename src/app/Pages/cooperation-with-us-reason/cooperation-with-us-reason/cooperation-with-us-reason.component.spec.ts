import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperationWithUsReasonComponent } from './cooperation-with-us-reason.component';

describe('CooperationWithUsReasonComponent', () => {
  let component: CooperationWithUsReasonComponent;
  let fixture: ComponentFixture<CooperationWithUsReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperationWithUsReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperationWithUsReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
