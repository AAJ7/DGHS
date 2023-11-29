import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderOffersComponent } from './slider-offers.component';

describe('SliderOffersComponent', () => {
  let component: SliderOffersComponent;
  let fixture: ComponentFixture<SliderOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
