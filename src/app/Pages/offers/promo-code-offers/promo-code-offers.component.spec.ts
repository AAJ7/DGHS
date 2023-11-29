import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeOffersComponent } from './promo-code-offers.component';

describe('PromoCodeOffersComponent', () => {
  let component: PromoCodeOffersComponent;
  let fixture: ComponentFixture<PromoCodeOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodeOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCodeOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
