import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrdersStatusComponent } from './home-orders-status.component';

describe('HomeOrdersStatusComponent', () => {
  let component: HomeOrdersStatusComponent;
  let fixture: ComponentFixture<HomeOrdersStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOrdersStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
