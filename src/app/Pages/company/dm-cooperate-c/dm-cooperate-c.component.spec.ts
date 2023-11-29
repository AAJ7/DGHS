import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCooperateCComponent } from './dm-cooperate-c.component';

describe('DmCooperateCComponent', () => {
  let component: DmCooperateCComponent;
  let fixture: ComponentFixture<DmCooperateCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCooperateCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmCooperateCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
