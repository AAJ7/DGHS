import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseOrderRatesComponent } from './base-order-rates.component';

describe('BaseOrderRatesComponent', () => {
  let component: BaseOrderRatesComponent;
  let fixture: ComponentFixture<BaseOrderRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseOrderRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseOrderRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
