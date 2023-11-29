import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalOffersComponent } from './global-offers.component';

describe('GlobalOffersComponent', () => {
  let component: GlobalOffersComponent;
  let fixture: ComponentFixture<GlobalOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
