import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePieChartsComponent } from './home-pie-charts.component';

describe('HomePieChartsComponent', () => {
  let component: HomePieChartsComponent;
  let fixture: ComponentFixture<HomePieChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePieChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePieChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
