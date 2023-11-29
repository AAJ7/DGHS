import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryStatusComponent } from './home-delivery-status.component';

describe('HomeDeliveryStatusComponent', () => {
  let component: HomeDeliveryStatusComponent;
  let fixture: ComponentFixture<HomeDeliveryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeliveryStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDeliveryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
