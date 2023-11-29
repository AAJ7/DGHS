import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAreaChartsComponent } from './home-area-charts.component';

describe('HomeAreaChartsComponent', () => {
  let component: HomeAreaChartsComponent;
  let fixture: ComponentFixture<HomeAreaChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAreaChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAreaChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
