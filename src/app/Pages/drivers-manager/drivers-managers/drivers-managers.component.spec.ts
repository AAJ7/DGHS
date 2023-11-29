import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversManagersComponent } from './drivers-managers.component';

describe('DriversManagersComponent', () => {
  let component: DriversManagersComponent;
  let fixture: ComponentFixture<DriversManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
