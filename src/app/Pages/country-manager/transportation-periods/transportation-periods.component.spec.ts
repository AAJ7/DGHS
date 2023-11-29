import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationPeriodsComponent } from './transportation-periods.component';

describe('TransportationPeriodsComponent', () => {
  let component: TransportationPeriodsComponent;
  let fixture: ComponentFixture<TransportationPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationPeriodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
