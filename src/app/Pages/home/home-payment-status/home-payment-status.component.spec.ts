import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaymentStatusComponent } from './home-payment-status.component';

describe('HomePaymentStatusComponent', () => {
  let component: HomePaymentStatusComponent;
  let fixture: ComponentFixture<HomePaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePaymentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
