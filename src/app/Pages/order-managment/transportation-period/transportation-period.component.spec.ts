import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationPeriodComponent } from './transportation-period.component';

describe('TransportationPeriodComponent', () => {
  let component: TransportationPeriodComponent;
  let fixture: ComponentFixture<TransportationPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
