import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversAssignedComponent } from './drivers-assigned.component';

describe('DriversAssignedComponent', () => {
  let component: DriversAssignedComponent;
  let fixture: ComponentFixture<DriversAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
