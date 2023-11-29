import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTypesComponent } from './delivery-types.component';

describe('DeliveryTypesComponent', () => {
  let component: DeliveryTypesComponent;
  let fixture: ComponentFixture<DeliveryTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
